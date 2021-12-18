import classes from './MainNavigation.module.css';
import Link from "next/link";

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Let's Meetup !!</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Meetups</Link>
          </li>
          <li>
            <Link href='/newMeet'>Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
