import { QuizCategory } from "../../types";
import { GetIconComponentByCategory } from "./BoxedIcon";
import IconAndNameGroup from "./IconAndNameGroup";

export const HeaderIcon = ({ category }: { category: QuizCategory }) => {
  const icon = GetIconComponentByCategory(category);
  return <IconAndNameGroup name={category}>{icon}</IconAndNameGroup>;
};
