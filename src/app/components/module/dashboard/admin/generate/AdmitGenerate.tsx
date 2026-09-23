'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IStudent } from '@/types/student.interface';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Printer, ArrowLeft, CheckCircle2 } from 'lucide-react';
import EmptyComp from '@/app/components/shared/EmptyComp';
import AdmitCard from '@/app/components/shared/template/AdmitCard';
import { Term } from '@/types/fee.interface';

const AdmitGenerate = ({
  students,
  term,
  year,
}: {
  students: IStudent[];
  term?: string;
  year?: string;
}) => {
  const searchParams = useSearchParams();
  const currentYear = new Date().getFullYear();

  const examTerm = (term || searchParams.get('term') || 'FIRST') as Term;
  const selectedYear = Number(year || searchParams.get('year') || currentYear);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showCards, setShowCards] = useState(false);

  const toggleAll = () => {
    if (selectedIds.length === students.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map((s) => s.id));
    }
  };

  const toggleStudent = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectedStudents = students.filter((s) => selectedIds.includes(s.id));

  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 100);
  };

  if (showCards && selectedStudents.length > 0) {
    return (
      <>
        {/* Header - Hidden when printing */}
        <div className="no-print max-w-7xl mx-auto mb-6 p-4 flex justify-between items-center bg-slate-50 rounded-lg shadow">
          <Button variant="outline" onClick={() => setShowCards(false)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <div className="text-center">
            <h2 className="font-bold text-lg">Preview Admit Cards</h2>
            <p className="text-sm text-muted-foreground">
              Total Selected: {selectedStudents.length} | Term: {examTerm} |
              Year: {selectedYear}
            </p>
          </div>
          <Button onClick={handlePrint} className="bg-primary">
            <Printer className="w-4 h-4 mr-2" /> Print
          </Button>
        </div>

        {/* Print Content */}
        <div className="print-area space-y-4">
          {selectedStudents.map((student, index) => (
            <div
              key={student.id}
              className={`${
                index > 0 && index % 2 === 0 ? 'print:break-before-page' : ''
              }`}
            >
              <AdmitCard
                student={student}
                term={examTerm}
                year={selectedYear}
              />
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="space-y-4">
      {students?.length > 0 ? (
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          {/* Action Bar */}
          <div className="p-4 border-b bg-muted/30">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="select-all"
                    checked={
                      selectedIds.length === students.length &&
                      students.length > 0
                    }
                    onCheckedChange={toggleAll}
                  />
                  <label
                    htmlFor="select-all"
                    className="text-sm font-semibold cursor-pointer select-none"
                  >
                    সবাইকে নির্বাচন করুন
                  </label>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">
                  {selectedIds.length} জন নির্বাচিত
                </span>
              </div>

              <Button
                disabled={selectedIds.length === 0}
                onClick={() => setShowCards(true)}
                size="sm"
              >
                প্রবেশপত্র তৈরি করুন
              </Button>
            </div>
          </div>

          {/* Student Grid */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {students.map((student) => {
              const isSelected = selectedIds.includes(student.id);
              return (
                <div
                  key={student.id}
                  onClick={() => toggleStudent(student.id)}
                  className={`group relative p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-background'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-bold leading-none">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">
                        রোল: {student.roll}
                      </p>
                      <p className="text-xs text-muted-foreground italic">
                        {student.class?.name}
                      </p>
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-muted-foreground/30" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <EmptyComp subject="student" />
      )}
    </div>
  );
};

export default AdmitGenerate;
