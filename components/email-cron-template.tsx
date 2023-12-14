import * as React from "react";

interface EmailTemplateProps {
  newUser: number;
  newSheet: number;
  totalOfUsers: number;
  totalOfSheets: number;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  newUser,
  newSheet,
  totalOfUsers,
  totalOfSheets,
}) => (
  <>
    <h1 className="text-2xl font-medium">
      Cette semaine il y a eu {newUser} nouveaux utilisateurs et {newSheet}{" "}
      nouvelles fiches !
    </h1>
    <p className="text-xl">
      Il y a maintenant {totalOfUsers} utilisateurs et {totalOfSheets} fiches !
    </p>
  </>
);
