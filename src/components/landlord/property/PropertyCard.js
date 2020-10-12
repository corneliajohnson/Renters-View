import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
}));

export const PropertyCard = ({ property }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <img src={require("../../../img/house.jpg")} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {property.street} {property.city} {property.state}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Tenant: {property.tenantId}
        </Typography>
        <Typography>Rent Price: ${property.rentAmount}</Typography>
      </CardContent>
    </Card>
  );
};
