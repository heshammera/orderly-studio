"use client";

import React from "react";
import { DisciplineShowcaseModal } from "@/components/showcase/DisciplineShowcaseModal";
import type { DisciplineId } from "@/data/disciplines";

interface ProjectBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: "en" | "ar";
  initialDiscipline?: DisciplineId;
}

export const ProjectBuilderModal: React.FC<ProjectBuilderModalProps> = ({
  isOpen,
  onClose,
  locale,
  initialDiscipline = "uiux",
}) => {
  return (
    <DisciplineShowcaseModal
      isOpen={isOpen}
      onClose={onClose}
      locale={locale}
      initialDiscipline={initialDiscipline}
    />
  );
};