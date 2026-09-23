/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { markAttendance } from '../../../../../services/attendance/markAttendance';
import { useRouter } from 'next/navigation';
import { buildPayloadRecords } from '../../../../../../lib/buildAttendPayload';
import {
  IAttendance,
  IUserAttend,
} from '../../../../../../types/attendance.interface';

const isDateToday = (dateInput: string | Date | undefined | null) => {
  if (!dateInput) return false;
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return false;

  const now = new Date();
  const isLocalToday =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();

  if (isLocalToday) return true;

  const bdtDate = new Date(d.getTime() + 6 * 60 * 60 * 1000);
  const bdtNow = new Date(now.getTime() + 6 * 60 * 60 * 1000);
  return (
    bdtDate.getUTCFullYear() === bdtNow.getUTCFullYear() &&
    bdtDate.getUTCMonth() === bdtNow.getUTCMonth() &&
    bdtDate.getUTCDate() === bdtNow.getUTCDate()
  );
};

const findTodayAttendance = (attendances?: any[]) => {
  if (!Array.isArray(attendances) || attendances.length === 0) return undefined;
  const todayRecords = attendances.filter(
    (a: any) => isDateToday(a.createdAt) || isDateToday(a.inTime)
  );
  if (!todayRecords.length) return undefined;
  todayRecords.sort((a: any, b: any) => {
    const timeA = new Date(a.createdAt || a.inTime).getTime();
    const timeB = new Date(b.createdAt || b.inTime).getTime();
    return timeB - timeA;
  });
  return todayRecords[0];
};

const MarkAttendance = ({ data }: { data: IUserAttend[] }) => {
  const [attendance, setAttendance] = useState<IAttendance[]>([]);
  const initialAttendance = useRef<IAttendance[]>([]);
  const [loading, setLoading] = useState(false);
  const [, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (!data?.length) return;

    const mapped = data.map((item) => {
      const attendances = item?.user?.attendances ?? [];
      const todayAttendance = findTodayAttendance(attendances);

      const status = todayAttendance?.status;

      const isPresentLike =
        !!todayAttendance?.inTime ||
        ['PRESENT', 'LATE', 'LEAVE'].includes(status);

      return {
        userId: item.userId,
        isInChecked: isPresentLike,
        isOutChecked: status === 'LEAVE' || !!todayAttendance?.outTime,
        inTime:
          todayAttendance?.inTime || todayAttendance?.createdAt || undefined,
        outTime: todayAttendance?.outTime || undefined,
      };
    });

    setAttendance(mapped);
    initialAttendance.current = JSON.parse(JSON.stringify(mapped));
  }, [data]);

  const updateRecord = (
    userId: string,
    type: 'IN' | 'OUT',
    checked: boolean
  ) => {
    setAttendance((prev) =>
      prev.map((item) => {
        if (item.userId !== userId) return item;
        const now = new Date().toISOString();

        if (type === 'IN') {
          return {
            ...item,
            isInChecked: checked,
            inTime: checked ? now : undefined,
            isOutChecked: checked ? item.isOutChecked : false,
            outTime: checked ? item.outTime : undefined,
          };
        }

        return {
          ...item,
          isOutChecked: checked,
          outTime: checked ? now : undefined,
        };
      })
    );
  };

  const handleSubmit = async () => {
    const records = buildPayloadRecords(attendance, initialAttendance);
    if (!records.length) {
      toast.info('No changes detected');
      return;
    }

    try {
      setLoading(true);
      const res = await markAttendance({ records });

      if (res.success || res.statusCode === 200 || res.statusCode === 201) {
        toast.success(res.message);

        startTransition(() => {
          router.refresh();
        });

        initialAttendance.current = JSON.parse(JSON.stringify(attendance));
      } else {
        toast.error(res.message || 'Failed to save');
      }
    } catch (e: any) {
      toast.error(e.message || 'Server connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 border rounded-xl overflow-hidden bg-card shadow-sm">
      <div className="flex justify-between items-center p-4 border-b bg-muted/30">
        <h2 className="text-xl font-bold">{'Student Attendance'}</h2>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 font-bold"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="pl-6 w-20">Roll</TableHead>

            <TableHead className="pl-6">Name</TableHead>
            <TableHead className="text-center">IN</TableHead>
            <TableHead className="text-center pr-6">OUT</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((user) => {
            const record = attendance.find((a) => a.userId === user.userId);
            const todayAttendance = findTodayAttendance(user.user?.attendances);
            const status = todayAttendance?.status;

            return (
              <TableRow
                key={user.userId}
                className="hover:bg-accent/5 transition-colors"
              >
                <TableCell className="font-medium text-muted-foreground pl-6">
                  {user.roll}
                </TableCell>

                <TableCell className="pl-6">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {user.firstName} {user.lastName}
                    </span>
                    {status === 'LATE' && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                        LATE
                      </span>
                    )}
                    {status === 'LEAVE' && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-green-100 text-green-800 border border-green-200">
                        LEAVE
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex flex-col items-center justify-center min-h-[55px] gap-1">
                    <Checkbox
                      checked={!!record?.isInChecked}
                      onCheckedChange={(v) =>
                        updateRecord(user.userId, 'IN', !!v)
                      }
                      className="size-6 ring-1"
                    />
                    {record?.isInChecked && (
                      <span className="text-[11px] font-bold text-primary">
                        {record.inTime && !isNaN(Date.parse(record.inTime))
                          ? new Date(record.inTime).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'PRESENT'}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="text-center pr-6">
                  <div className="flex flex-col items-center justify-center min-h-[55px] gap-1">
                    <Checkbox
                      checked={!!record?.isOutChecked}
                      onCheckedChange={(v) =>
                        updateRecord(user.userId, 'OUT', !!v)
                      }
                      disabled={!record?.isInChecked}
                      className="size-6 ring-1"
                    />
                    {record?.isOutChecked && (
                      <span className="text-[11px] font-bold text-primary">
                        {record.outTime && !isNaN(Date.parse(record.outTime))
                          ? new Date(record.outTime).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'OUT'}
                      </span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MarkAttendance;
