import { Container } from "@/components/layout/container/container";
import { Button } from "@/components/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Input } from "@/components/ui/input/input";
import { useAppStore } from "@/hooks/use-app-store";
import { useNavigate } from "react-router-dom";
import { routes } from "@/router.tsx";
import { useTranslation } from "react-i18next";

const NewFeature = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setFeature } = useAppStore();

  return (
    <Container>
      <Card>
        <CardHeader className="mb-4">
          <CardTitle className="text-5xl font-semibold text-center">
            {t("new.feature.title")}
          </CardTitle>
          <CardDescription className="text-lg text-gray-500 text-center">
            {t("new.feature.subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 items-center">
            <Input
              className="w-3/5"
              placeholder="Adding user authentication"
              onChange={(e) => setFeature(e.target.value)}
            />
            <Button
              className="w-2/6"
              onClick={() => navigate(routes.refineFeature)}
            >
              {t("new.feature.button.startRefining")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewFeature;
