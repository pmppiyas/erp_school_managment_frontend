/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Loader2,
  Printer,
  Check,
  CheckCircle,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { IStudent } from '@/types/student.interface';
import { IFeeType, PaidFee, Term } from '@/types/fee.interface';
import ClassSelector from '@/app/components/shared/ClassSelector';
import { makeFee } from '@/app/services/fee/makeFee';
import { MONTHS, TERMS } from '@/constant';
import { IClass } from '@/types/class.interface';
import { myPaidFees } from '@/app/services/fee/paidFees';
import { useRouter } from 'next/navigation';
import SuccessModal from '@/app/components/module/dashboard/admin/payment/SuccessModal';
import PaymentSlip from '@/app/components/shared/template/PaymentSlip';
import AdmitCard from '@/app/components/shared/template/AdmitCard';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR - i);

type PrintType = 'SLIP' | 'ADMIT' | null;

const CreatePayment = ({
  classes,
  students,
  feetypes,
}: {
  classes: IClass[];
  students: IStudent[];
  feetypes: IFeeType[];
}) => {
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const [selectedFeeTypes, setSelectedFeeTypes] = useState<IFeeType[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');

  const [paymentAmount, setPaymentAmount] = useState('');
  const [tuitionMonths, setTuitionMonths] = useState<string[]>([]);
  const [monthlyMonths, setMonthlyMonths] = useState<string[]>([]);
  const [examTerm, setExamTerm] = useState<Term | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(CURRENT_YEAR);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paidFees, setPaidFees] = useState<PaidFee[]>([]);
  const [loadingPaidFees, setLoadingPaidFees] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [printType, setPrintType] = useState<PrintType>(null);

  const hasTuition = selectedFeeTypes.some((fee) => fee.category === 'TUITION');
  const hasMonthly = selectedFeeTypes.some((fee) => fee.category === 'MONTHLY');
  const router = useRouter();

  const fetchPaidFees = useCallback(async () => {
    if (!selectedStudent?.id || !selectedYear) {
      setPaidFees([]);
      return;
    }
    setLoadingPaidFees(true);
    try {
      const data = await myPaidFees(
        selectedStudent.id,
        selectedYear.toString()
      );
      setPaidFees(data || []);
    } catch (error) {
      setPaidFees([]);
    } finally {
      setLoadingPaidFees(false);
    }
  }, [selectedStudent?.id, selectedYear]);

  useEffect(() => {
    fetchPaidFees();
  }, [fetchPaidFees]);

  const getPaidMonthsByCategory = (category: string): Set<string> => {
    if (!selectedYear) return new Set();
    const paidMonthsSet = new Set<string>();
    paidFees.forEach((pf) => {
      if (pf.feeType?.category === category && pf.month) {
        if (Array.isArray(pf.month)) {
          pf.month.forEach((m) => paidMonthsSet.add(m.toUpperCase()));
        } else if (typeof pf.month === 'string') {
          paidMonthsSet.add(pf.month.toUpperCase());
        }
      }
    });
    return paidMonthsSet;
  };

  const getPaidTermsByCategory = (category: string): Set<Term> => {
    if (!selectedYear) return new Set();
    const paidTermsSet = new Set<Term>();
    paidFees.forEach((pf) => {
      if (pf.feeType?.category === category && pf.term) {
        paidTermsSet.add(pf.term);
      }
    });
    return paidTermsSet;
  };

  useEffect(() => {
    const paidTuition = getPaidMonthsByCategory('TUITION');
    const paidMonthly = getPaidMonthsByCategory('MONTHLY');
    setTuitionMonths((prev) =>
      prev.filter((m) => !paidTuition.has(m.toUpperCase()))
    );
    setMonthlyMonths((prev) =>
      prev.filter((m) => !paidMonthly.has(m.toUpperCase()))
    );
  }, [paidFees]);

  const isFeeTypePaid = (feeType: IFeeType): boolean => {
    if (!selectedYear) return false;
    const paidForCategory = paidFees.filter(
      (pf) => pf.feeType?.category === feeType.category
    );
    if (paidForCategory.length === 0) return false;
    if (feeType.category === 'TUITION' || feeType.category === 'MONTHLY') {
      const paidMonths = getPaidMonthsByCategory(feeType.category);
      return paidMonths.size === 12;
    }
    if (feeType.category === 'EXAM') {
      const paidTerms = getPaidTermsByCategory(feeType.category);
      return paidTerms.size === TERMS.length;
    }
    return paidForCategory.some((pf) => !pf.month && !pf.term);
  };

  const calculatedBreakdown = useMemo(() => {
    const breakdown: any[] = [];
    let total = 0;
    selectedFeeTypes.forEach((fee) => {
      if (fee.category === 'TUITION' && tuitionMonths.length > 0) {
        const feeTotal = fee.amount * tuitionMonths.length;
        breakdown.push({
          name: `Tuition Fee`,
          amount: feeTotal,
          months: tuitionMonths.join(', '),
        });
        total += feeTotal;
      } else if (fee.category === 'MONTHLY' && monthlyMonths.length > 0) {
        const feeTotal = fee.amount * monthlyMonths.length;
        breakdown.push({
          name: `Monthly Fee`,
          amount: feeTotal,
          months: monthlyMonths.join(', '),
        });
        total += feeTotal;
      } else if (fee.category === 'EXAM' && examTerm) {
        breakdown.push({
          name: `Exam Fee`,
          amount: fee.amount,
          term: examTerm,
        });
        total += fee.amount;
      } else if (!['TUITION', 'MONTHLY', 'EXAM'].includes(fee.category)) {
        breakdown.push({ name: fee.category, amount: fee.amount });
        total += fee.amount;
      }
    });
    return { breakdown, total };
  }, [selectedFeeTypes, tuitionMonths, monthlyMonths, examTerm]);

  useEffect(() => {
    setPaymentAmount(String(calculatedBreakdown.total));
  }, [calculatedBreakdown.total]);

  const handleFullReset = () => {
    setSelectedClassId('');
    setSelectedStudent(null);
    setSelectedFeeTypes([]);
    setTuitionMonths([]);
    setMonthlyMonths([]);
    setExamTerm(null);
    setPaymentAmount('0');
    setSuccessData(null);
    setPaidFees([]);
    setShowSuccessModal(false);
    setPrintType(null);
  };

  const handlePrint = (type: PrintType) => {
    setPrintType(type);
    setTimeout(() => {
      window.print();
      setTimeout(() => setPrintType(null), 100);
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedStudent ||
      selectedFeeTypes.length === 0 ||
      Number(paymentAmount) <= 0
    )
      return;

    const currentSlipData = {
      student: selectedStudent,
      year: selectedYear,
      breakdown: calculatedBreakdown.breakdown,
      total: paymentAmount,
    };

    setIsProcessing(true);
    const promises = selectedFeeTypes.map((feeType) => {
      const payload = {
        studentId: selectedStudent!.id,
        feeTypeId: feeType.id,
        amount: feeType.amount,
        year: selectedYear!,
        month:
          feeType.category === 'TUITION'
            ? tuitionMonths
            : feeType.category === 'MONTHLY'
              ? monthlyMonths
              : undefined,
        term: feeType.category === 'EXAM' ? examTerm : undefined,
      };
      return makeFee(payload);
    });

    try {
      const results = await Promise.all(promises);
      if (results.every((res) => res.success)) {
        setSuccessData(currentSlipData);
        setShowSuccessModal(true);
        router.refresh();
      } else {
        toast.error(results.find((r) => !r.success)?.message || 'Failed');
      }
    } catch (error) {
      toast.error('Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto  space-y-6">
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={handleFullReset}
          onPrintSlip={() => handlePrint('SLIP')}
          onPrintAdmit={() => handlePrint('ADMIT')}
          hasExamFee={successData?.breakdown.some((item: any) => item.term)}
        />

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 no-print">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ClassSelector
                classes={classes}
                onChange={(id) => {
                  setSelectedClassId(id);
                  setSelectedStudent(null);
                  setSelectedFeeTypes([]);
                }}
              />
              <Select
                value={selectedStudent?.id || ''}
                onValueChange={(id) => {
                  setSelectedStudent(students.find((s) => s.id === id) || null);
                  setSelectedFeeTypes([]);
                }}
              >
                <SelectTrigger className="bg-background border-input">
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.firstName} (Roll: {s.roll})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center justify-center p-6 bg-muted/30 border-border border-dashed">
            {selectedStudent ? (
              <div className="text-center space-y-2">
                <div className="relative h-20 w-20 mx-auto">
                  <Image
                    src={selectedStudent.photo || '/avatar.png'}
                    alt="student"
                    fill
                    className="rounded-full object-cover border-2 border-primary/20"
                  />
                </div>
                <h3 className="font-bold text-foreground">
                  {selectedStudent.firstName}
                </h3>
                <Badge variant="secondary" className="font-mono">
                  Roll: {selectedStudent.roll}
                </Badge>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm italic">
                Select a student
              </p>
            )}
          </Card>

          <Card className="flex items-center justify-center border-primary/20 bg-primary/5 shadow-inner">
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Total Payable
              </p>
              <p className="text-3xl font-black text-primary">
                ৳{paymentAmount}
              </p>
            </div>
          </Card>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="no-print">
          <Card className="border-border">
            <CardContent className="pt-6 space-y-6">
              {loadingPaidFees && (
                <div className="flex items-center gap-2 text-primary animate-pulse font-medium">
                  <Loader2 className="animate-spin w-4 h-4" /> Fetching payment
                  history...
                </div>
              )}

              <div className="space-y-4">
                <Label className="font-bold text-lg text-foreground">
                  Select Fee Types
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {feetypes.map((fee) => {
                    const isSelected = selectedFeeTypes.some(
                      (f) => f.id === fee.id
                    );
                    const isPaid = isFeeTypePaid(fee);
                    return (
                      <div
                        key={fee.id}
                        onClick={() =>
                          !isPaid &&
                          (isSelected
                            ? setSelectedFeeTypes((prev) =>
                                prev.filter((f) => f.id !== fee.id)
                              )
                            : setSelectedFeeTypes((prev) => [...prev, fee]))
                        }
                        className={`p-4 rounded-xl border-2 cursor-pointer relative transition-all duration-200
                          ${
                            isPaid
                              ? 'bg-secondary/50 border-secondary opacity-70 cursor-not-allowed'
                              : isSelected
                                ? 'border-primary bg-primary/10'
                                : 'border-border bg-card hover:border-primary/50'
                          }`}
                      >
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">
                          {fee.category}
                        </p>
                        <p className="text-lg font-bold text-foreground">
                          ৳{fee.amount}
                        </p>
                        {isPaid && (
                          <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-primary" />
                        )}
                        {isSelected && !isPaid && (
                          <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-ping" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* TUITION MONTHS */}
              {hasTuition && (
                <div className="p-4 bg-accent/30 rounded-xl border border-border">
                  <Label className="font-bold text-foreground">
                    Select Tuition Months
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {MONTHS.map((m) => {
                      const isPaid = getPaidMonthsByCategory('TUITION').has(
                        m.toUpperCase()
                      );
                      const isSelected = tuitionMonths.includes(m);
                      return (
                        <Button
                          key={m}
                          type="button"
                          size="sm"
                          variant={
                            isPaid
                              ? 'secondary'
                              : isSelected
                                ? 'default'
                                : 'outline'
                          }
                          disabled={isPaid}
                          onClick={() =>
                            setTuitionMonths((prev) =>
                              isSelected
                                ? prev.filter((x) => x !== m)
                                : [...prev, m]
                            )
                          }
                          className="min-w-20"
                        >
                          {m} {isPaid && <Check className="ml-1 w-3 h-3" />}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* MONTHLY MONTHS */}
              {hasMonthly && (
                <div className="p-4 bg-accent/30 rounded-xl border border-border">
                  <Label className="font-bold text-foreground">
                    Select Monthly Fee Months
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {MONTHS.map((m) => {
                      const isPaid = getPaidMonthsByCategory('MONTHLY').has(
                        m.toUpperCase()
                      );
                      const isSelected = monthlyMonths.includes(m);
                      return (
                        <Button
                          key={m}
                          type="button"
                          size="sm"
                          variant={
                            isPaid
                              ? 'secondary'
                              : isSelected
                                ? 'default'
                                : 'outline'
                          }
                          disabled={isPaid}
                          onClick={() =>
                            setMonthlyMonths((prev) =>
                              isSelected
                                ? prev.filter((x) => x !== m)
                                : [...prev, m]
                            )
                          }
                          className="min-w-20"
                        >
                          {m} {isPaid && <Check className="ml-1 w-3 h-3" />}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-end gap-4 border-t border-border pt-6">
                {/* Academic Year Selection */}
                <div className="flex-1 min-w-[120px]">
                  <Label className="text-muted-foreground mb-2 block">
                    Academic Year
                  </Label>
                  <Select
                    value={selectedYear?.toString()}
                    onValueChange={(v) => setSelectedYear(Number(v))}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map((y) => (
                        <SelectItem key={y} value={y.toString()}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedFeeTypes.some((f) => f.category === 'EXAM') && (
                  <div className="flex-1 min-w-[150px] animate-in fade-in slide-in-from-left-2">
                    <Label className="text-muted-foreground mb-2 block font-medium">
                      Select Exam Term
                    </Label>
                    <Select
                      value={examTerm || ''}
                      onValueChange={(v) => setExamTerm(v as Term)}
                    >
                      <SelectTrigger className="bg-background border-primary/50 ring-offset-background">
                        <SelectValue placeholder="Choose Term" />
                      </SelectTrigger>
                      <SelectContent>
                        {TERMS.map((t) => {
                          const isPaid = getPaidTermsByCategory('EXAM').has(
                            t as Term
                          );
                          return (
                            <SelectItem key={t} value={t} disabled={isPaid}>
                              {t} {isPaid ? '(Paid)' : ''}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Calculated Total */}
                <div className="flex-2 min-w-[200px]">
                  <Label className="text-muted-foreground mb-2 block">
                    Calculated Total
                  </Label>
                  <Input
                    value={`৳ ${paymentAmount}`}
                    readOnly
                    className="font-bold text-lg bg-muted text-foreground"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  size="lg"
                  disabled={
                    !selectedStudent ||
                    selectedFeeTypes.length === 0 ||
                    isProcessing ||
                    (selectedFeeTypes.some((f) => f.category === 'EXAM') &&
                      !examTerm)
                  }
                  type="submit"
                  className="px-10 font-bold shadow-lg"
                >
                  {isProcessing && <Loader2 className="animate-spin mr-2" />}
                  Confirm & Pay
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        <div className="print-area">
          {successData && printType && (
            <>
              {printType === 'SLIP' && (
                <div className="mt-2 bg-white">
                  <PaymentSlip
                    student={successData.student}
                    year={successData.year}
                    breakdown={successData.breakdown}
                    total={successData.total}
                    receiptNo={new Date().getTime().toString().slice(-6)}
                  />
                </div>
              )}

              {printType === 'ADMIT' &&
                successData.breakdown.some((item: any) => item.term) && (
                  <div className="mt-2 bg-white">
                    <AdmitCard
                      student={successData.student}
                      term={
                        successData.breakdown.find((item: any) => item.term)
                          ?.term
                      }
                      year={successData.year}
                    />
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CreatePayment;
