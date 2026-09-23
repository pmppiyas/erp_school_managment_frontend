'use client';

import { useState, useEffect } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { terms } from '@/constant';

interface TermSelectorProps {
  termsList?: { label: string; value: string }[];
  defaultTerm?: string;
}

const TermSelector = ({
  termsList = terms,
  defaultTerm,
}: TermSelectorProps = {}) => {
  const [selectedTerm, setSelectedTerm] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fallbackDefault = defaultTerm || termsList[0]?.value || 'FIRST';

  useEffect(() => {
    const initValue = () => {
      const urlTerm = searchParams.get('term');

      if (urlTerm && termsList.some((t) => t.value === urlTerm)) {
        setSelectedTerm(urlTerm);
      } else {
        setSelectedTerm(fallbackDefault);

        const params = new URLSearchParams(searchParams.toString());
        params.set('term', fallbackDefault);
        params.set('page', '1');

        router.replace(`${pathname}?${params.toString()}`, {
          scroll: false,
        });
      }
    };

    initValue();
  }, [searchParams, pathname, router, fallbackDefault, termsList]);

  const handleChange = (value: string) => {
    setSelectedTerm(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set('term', value);
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative min-w-[130px]">
      <Select value={selectedTerm} onValueChange={handleChange}>
        <SelectTrigger className="bg-background text-primary font-medium border-input shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors">
          <SelectValue placeholder="Select Term" />
        </SelectTrigger>
        <SelectContent>
          {termsList.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TermSelector;
