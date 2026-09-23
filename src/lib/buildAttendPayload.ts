/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAttendance } from '../types/attendance.interface';

export const buildPayloadRecords = (
  attendance: IAttendance[],
  initialAttendance: any
) => {
  const records: any[] = [];
  attendance.forEach((current) => {
    const initial = initialAttendance.current.find(
      (i: { userId: string }) => i.userId === current.userId
    );
    if (!initial) return;

    const inChanged = initial.isInChecked !== current.isInChecked;
    const outChanged = initial.isOutChecked !== current.isOutChecked;

    if (!inChanged && !outChanged) return;

    const record: any = {
      userId: current.userId,
    };

    if (inChanged) {
      record.status = current.isInChecked ? 'PRESENT' : 'ABSENT';
      record.inTime = current.isInChecked ? current.inTime : null;
    }

    if (outChanged) {
      record.outTime = current.isOutChecked ? current.outTime : null;
      if (current.isOutChecked) {
        record.status = 'LEAVE';
      }
    }

    records.push(record);
  });
  return records;
};
