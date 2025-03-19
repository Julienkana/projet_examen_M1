import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link href="/">Accueil</Link></li>
        <li><Link href="/livres">Liste des livres</Link></li>
        <li><Link href="/auteurs">Liste des auteurs</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
