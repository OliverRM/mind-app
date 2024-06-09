import { useQuery } from "@tanstack/react-query";

type Profile = {
  name: string;
  subtitle: string;
  paymentStatus: "PAYED" | "PENDING";
  extraData: { label: string; value: string }[];
};

export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: (): Profile => ({
      name: "Oliver Mayer",
      subtitle: "Teilnehmer:in",
      paymentStatus: "PAYED",
      extraData: [
        { label: "Zimmernummer", value: "203" },
        { label: "Essenspräferenz", value: "Vegetarisch" },
        { label: "T-Shirt", value: "Männer L Grün" },
      ],
    }),
  });
