interface ISubtask {
  title: string;
  description?: string;
  url?: string;
  note?: string;
}

// Interface for tasks
interface ITask {
  title: string;
  description?: string;
  subtasks?: ISubtask[];
  url?: string;
  note?: string;
}

// Main challenge interface
export interface Challenge {
  id: string;
  title: string;
  deadline: Date;
  duration: string;
  moneyPrize: number;
  contactEmail: string;
  projectDescription: string;
  projectBrief: string;
  projectDescriptionTasks: string;
  tasks: ITask[];
  skillsNeeded: string[];
  seniority: "Junior" | "Intermediate" | "Senior";
  isOpen: boolean;
  status: "open" | "completed";
  type: "Challenge" | "Hackathon";
  keyInstructions: string;
  participants: string[];
  createdAt: Date;
  updatedAt: Date;
}
