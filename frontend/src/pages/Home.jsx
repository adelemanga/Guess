import Slider from "../components/Slider";
import ButtonGithub from "../components/ButtonGithub";
import Button from "@components/Button";
import Avatar from "@components/Avatar"

export default function Home() {
  return (
    <header className="App-header">
      <ButtonGithub devName="Adèle" devLink="" />
      <ButtonGithub
        devName="Alexandre"
        devLink="https://github.com/Alexandre78R"
      />
      <ButtonGithub devName="Jean-Maxime" />
      <ButtonGithub
        devName="Thomas"
        devLink="https://github.com/ThomasLonjon"
      />

      <Button buttonType= "small" text="Sign in!"/>
      <Button buttonType= "big" text="Number of questions"/>
      <Avatar AvatarType="small"/>
      <Slider maxRange={30} defaultRange={8} unit="s" />
    </header>
  );
}
