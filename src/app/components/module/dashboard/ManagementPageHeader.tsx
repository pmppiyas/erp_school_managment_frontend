'use client';

import React from 'react';
import HeaderActionButton from '@/app/components/module/dashboard/HeaderActionButton';
import {
  IAction,
  IManagementPageHeaderProps,
} from '@/app/components/module/dashboard/interfaces';

const ManagementPageHeader = ({
  icon,
  title,
  description,
  actions = [],
  showSearch = false,
  searchField,
  classSelector,
  modeSelector,
  isLoading = false,
}: IManagementPageHeaderProps & {
  searchField?: React.ReactNode;
  modeSelector?: React.ReactNode;
}) => {
  return (
    <header className="relative overflow-hidden container max-w-7xl mx-auto px-6 py-6 rounded-xl mb-6 border shadow-sm bg-linear-to-r from-primary/10 via-primary/5 to-background">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative space-y-4">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            {!isLoading && icon && (
              <div className="p-4 bg-primary text-primary-foreground rounded-2xl shadow-blue-500/20 shadow-xl shrink-0">
                {React.isValidElement(icon)
                  ? React.cloneElement(
                      icon as React.ReactElement<
                        React.HTMLAttributes<HTMLElement>
                      >,
                      {
                        className: 'w-8 h-8 ',
                      }
                    )
                  : icon}
              </div>
            )}

            <div className="space-y-1">
              {isLoading ? (
                <>
                  <div className="h-8 w-48 bg-muted animate-pulse rounded-lg" />
                  <div className="h-4 w-72 bg-muted animate-pulse rounded-md" />
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    {title}
                  </h1>
                  {description && (
                    <p className="text-muted-foreground text-sm font-medium max-w-xl leading-relaxed">
                      {description}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          {actions?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5 justify-start xl:justify-end">
              {actions.map((action, idx) => {
                if (React.isValidElement(action)) {
                  return <React.Fragment key={idx}>{action}</React.Fragment>;
                }
                const act = action as IAction;
                return (
                  <HeaderActionButton
                    key={idx}
                    Icon={act?.icon}
                    label={act?.label}
                    onClick={act?.onClick}
                    href={act?.href}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Filters & Search */}
        {(classSelector || showSearch || modeSelector) && (
          <div className="pt-2">
            <div className="flex flex-col md:flex-row items-center gap-4 p-3 bg-muted/40 rounded-xl border border-muted-foreground/10 backdrop-blur-md shadow-sm">
              {classSelector && (
                <div className="w-full md:w-auto min-w-[200px]">
                  {classSelector}
                </div>
              )}

              {modeSelector && (
                <div className="w-full md:w-auto md:border-l md:pl-4 border-muted-foreground/20">
                  {modeSelector}
                </div>
              )}

              <div className="hidden md:block flex-1" />

              {showSearch && (
                <div className="w-full md:w-auto flex justify-end">
                  {searchField}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ManagementPageHeader;
