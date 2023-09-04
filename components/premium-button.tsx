import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function PremiumButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="premium">Passer Premium</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <span className="mr-4 text-xl md:text-3xl">
              Passer{" "}
              <span className="font-extrabold text-transparent uppercase bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
                Premium
              </span>
            </span>
            {/* @ts-ignore */}
            <lord-icon
              src="https://cdn.lordicon.com/tyvtvbcy.json"
              trigger="loop"
              delay="2000"
              colors="primary:#fff"
              style={{ width: "50px", height: "50px" }}
            />
          </DialogTitle>
          <DialogDescription>
            Vous souhaitez passer Premium ? C&apos;est par ici ! Vous
            béneficirez d&apos;un accès illimité à toutes les fonctionnalités.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          
        </div>
        <DialogFooter>
          <Button type="submit" variant={"premium"}>
            Passer Premium
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
