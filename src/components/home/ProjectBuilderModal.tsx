"use client";

import React from "react";
import { DisciplineShowcaseModal } from "@/components/showcase/DisciplineShowcaseModal";
import type { DisciplineId } from "@/data/disciplines";

interface ProjectBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDiscipline?: DisciplineId;
  // locale kept for any external callers that still pass it — ignored here
  locale?: "en" | "ar";
  initialWorld?: string;
}

export const ProjectBuilderModal: React.FC<ProjectBuilderModalProps> = ({
  isOpen,
  onClose,
  initialDiscipline = "uiux",
}) => {
  return (
    <DisciplineShowcaseModal
      isOpen={isOpen}
      onClose={onClose}
      initialDiscipline={initialDiscipline}
    />
  );
};