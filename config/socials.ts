import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "Github",
    username: "@sirak-cpu",
    icon: Icons.gitHub,
    link: "https://github.com/sirak-cpu",
  },
  {
    name: "LinkedIn",
    username: "Sirak Embibel",
    icon: Icons.linkedin,
    link: "https://www.linkedin.com/in/sirak-embibel",
  },
  {
    name: "Gmail",
    username: "sirakbayet@gmail.com",
    icon: Icons.gmail,
    link: "mailto:sirakbayet@gmail.com",
  },
  {
    name: "Phone",
    username: "0910835614",
    icon: Icons.contact,
    link: "tel:0910835614",
  },
];
