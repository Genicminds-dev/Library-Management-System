// src/components/ui/card/card.tsx
import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string; // Custom classes for styling
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`rounded-lg p-2 shadow-lg ${className}`}>
    {children}
  </div>
);

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);