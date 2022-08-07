import { serialize } from "cookie";
import { verify } from "jsonwebtoken";

export default function logoutHandle(req, res) {
  const { myTokenName } = req.cookies;
  console.log(myTokenName);
  if (!myTokenName) {
    return res.status(401).json({ error: "no token" });
  }

  try {
    verify(myTokenName, "secret");
    const serialized = serialize("myTokenName", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    res.status(200).json("logout successfully");
  } catch (error) {
    return res.status(401).json({ error: "invalid token" });
  }
}
