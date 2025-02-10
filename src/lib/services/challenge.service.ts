import prisma from "../../../prisma/client";
import { Challenge } from "@/types/challenge";

export class ChallengeService {
  public async createChallenge(challengeData: Challenge) {
    const createData = {
      title: challengeData.title,
      deadline: challengeData.deadline,
      duration: challengeData.duration,
      moneyPrize: challengeData.moneyPrize,
      contactEmail: challengeData.contactEmail,
      projectDescription: challengeData.projectDescription,
      projectBrief: challengeData.projectBrief,
      projectDescriptionTasks: challengeData.projectDescriptionTasks,
      tasks: challengeData.tasks.map((task) => ({
        title: task.title,
        description: task.description,
      })),
      skillsNeeded: challengeData.skillsNeeded,
      seniority: challengeData.seniority,
      isOpen: challengeData.isOpen,
      status: challengeData.status,
      type: challengeData.type,
      keyInstructions: challengeData.keyInstructions,
      participants: {
        connect: challengeData.participants.map((participantId) => ({
          id: participantId,
        })),
      },
    };

    const newChallenge = await prisma.challenge.create({
      data: createData,
    });
    return newChallenge;
  }

  public async getOpenChallenges() {
    const openChallenges = await prisma.challenge.findMany({
      where: { isOpen: true },
    });
    return openChallenges;
  }

  public async getAllChallenges() {
    const allChallenges = await prisma.challenge.findMany({});
    return allChallenges;
  }

  public async getChallengeById(challengeId: string) {
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });
    return challenge;
  }

  public async updateChallenge(
    challengeId: string,
    updateData: Partial<Challenge>
  ) {
    const receivedUpdateData = {
      title: updateData.title,
      deadline: updateData.deadline,
      duration: updateData.duration,
      moneyPrize: updateData.moneyPrize,
      contactEmail: updateData.contactEmail,
      projectDescription: updateData.projectDescription,
      projectBrief: updateData.projectBrief,
      projectDescriptionTasks: updateData.projectDescriptionTasks,
      tasks: updateData?.tasks?.map((task) => ({
        title: task.title,
        description: task.description,
      })),
      skillsNeeded: updateData.skillsNeeded,
      seniority: updateData.seniority,
      isOpen: updateData.isOpen,
      status: updateData.status,
      type: updateData.type,
      keyInstructions: updateData.keyInstructions,
      participants: {
        connect: updateData?.participants?.map((participantId) => ({
          id: participantId,
        })),
      },
    };

    const updatedChallenge = await prisma.challenge.update({
      where: { id: challengeId },
      data: receivedUpdateData,
    });
    return updatedChallenge;
  }

  public async deleteChallenge(challengeId: string) {
    const deletedChallenge = await prisma.challenge.delete({
      where: { id: challengeId },
    });
    return deletedChallenge;
  }
}
