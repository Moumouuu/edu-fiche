import { UserApiLimit } from "@prisma/client";
import * as React from "react";

interface EmailTemplateProps {
  message: string;
  sender: UserApiLimit;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  message,
  sender,
}) => (
  <>
    <h1 className="text-2xl font-medium">
      Nouveau Feedback utilisateur - {sender.userEmail} ({sender.count} fiches)
      - Création de compte :{sender.createdAt.toISOString()}
    </h1>
    <p>{message}</p>
  </>
);
