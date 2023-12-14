import * as React from "react";

interface EmailTemplateProps {
  message: string;
  sender: any;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  message,
  sender,
}) => (
  <>
    <h1 className="text-2xl font-medium">
      Nouveau Feedback utilisateur - {sender.userEmail} ({sender.sheetGenerated}{" "}
      fiches) - Création de compte :{sender.createdAt.toString()}
    </h1>
    <p>{message}</p>
  </>
);
