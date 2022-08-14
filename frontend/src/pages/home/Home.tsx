import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import WebLayout from "../../layouts/web-layout";

let services = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1495/1495118.png",
    text: "Low cost Coaching Administrator Application",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2906/2906274.png",
    text: "Dedicated Software Solution",
  },
  {
    icon: "https://cdn-icons.flaticon.com/png/512/2721/premium/2721587.png?token=exp=1660498508~hmac=096b6ee36788823336064f78162d7746",
    text: "Custom Software Services",
  },
  {
    icon: "https://cdn-icons.flaticon.com/png/512/3201/premium/3201521.png?token=exp=1660498573~hmac=9d8b4ac9fcc780f753bcab77fecf14bd",
    text: "Client Side App for Coaching Administrator",
  },
];
let contacts = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/220/220236.png",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1384/1384053.png",
  },
];
export function Footer() {
  return (
    <Grid
      container
      sx={{ backgroundColor: "black", color: "white", padding: 4 }}
      direction="column"
      alignItems="center"
    >
      <Grid item sx={{ mb: 3 }}>
        <Typography variant="h4">Developed and Maintained by</Typography>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Avatar
                src="https://avatars.githubusercontent.com/u/46061332?v=4"
                sx={{ width: "200px", height: "200px" }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h5">Kazi Wasif Amin Shammya</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">CSE, BUET</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Avatar
                src="https://avatars.githubusercontent.com/u/46004817?v=4"
                sx={{ width: "200px", height: "200px" }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h5">Md. Mehedi Hasan</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">CSE, BUET</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default function Home() {
  return (
    <WebLayout>
      <Grid container direction="column" sx={{ marginTop: "20px" }}>
        <Grid sx={{ padding: "24px 32px" }}>
          <Grid item container direction="column" spacing={10}>
            <Grid item container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h4" sx={{ textAlign: "right" }}>
                  We are
                </Typography>
                <Typography
                  variant="h2"
                  sx={{ textAlign: "right", fontWeight: "bold" }}
                >
                  Coaching Administrator
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <img
                  style={{ maxWidth: "580px" }}
                  src="https://5.imimg.com/data5/ER/MT/XT/SELLER-80172108/coaching-class-admission-start-for-11th-physics-in-kamothe-500x500.jpg"
                  width="100%"
                />
              </Grid>
            </Grid>
            <Grid item container direction="column" spacing={2}>
              <Grid item>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                >
                  Our Services
                </Typography>
              </Grid>
              <Grid item container spacing={4}>
                {services.map((item, idx) => (
                  <Grid item key={idx} xs={6} sm={4} md={3}>
                    <Card sx={{ width: "100%", height: "330px" }}>
                      <CardContent>
                        <Grid
                          container
                          direction="column"
                          alignItems="center"
                          spacing={2}
                        >
                          <Grid item>
                            <img src={item.icon} height="200px" />
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="h5"
                              sx={{ textAlign: "center" }}
                            >
                              {item.text}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justifyContent="space-around"
              alignContent="center"
            >
              <Grid
                container
                spacing={4}
                direction="row"
                justifyContent="space-around"
              >
                {contacts.map((item, idx) => (
                  <Grid item key={idx}>
                    <Card>
                      <CardContent>
                        <img src={item.icon} width="200px" />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </WebLayout>
  );
}
