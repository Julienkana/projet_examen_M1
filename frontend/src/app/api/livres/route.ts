import { NextResponse } from "next/server";

const livres = [
  { id: 1, titre: "L'Attentat", auteur: "Yasmina Khadra", anneePublication: 2005, prix: 10 },
  { id: 2, titre: "1984", auteur: "George Orwell", anneePublication: 1949, prix: 15 },
];

export async function GET() {
  return NextResponse.json(livres);
}
