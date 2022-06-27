import { SvgIcon } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import classes from "./configure.module.css";
import SVGComponent from "./SVGComponent";

function ProjectIcon(props) {
  const { color, className, width, height } = props;
  return (

    <SVGComponent  width={150} height={150}   className={ classes.someIcon }/>
   
  );
}


function Configure({ theme }) {
  return (
    <div className={classes.configureContainer}>
      <ProjectIcon
        color={
          (theme.palette.type === "dark"
          ? true
          : false)
            ? "white"
            : "rgb(33, 37, 41)"
        }
        altColor={
          (theme.palette.type === "dark"
          ? true
          : false)
            ? "rgb(33, 37, 41)"
            : "white"
        }
        width="123px"
        height="42.3px"
        className={classes.logo}
      />
    </div>
  );
}

export default withTheme(Configure);
