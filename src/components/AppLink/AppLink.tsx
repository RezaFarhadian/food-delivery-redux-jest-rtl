import { Link, LinkProps } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type HrefRequired<T> = T extends { href: any } ?
  T :
  T & { href: string };

interface AppLinkProps extends HrefRequired<LinkProps> {
  testid?: string;
}

function AppLink(props: AppLinkProps) {
  return(
    <Link {...props}>
      {props.testid &&
        <RouterLink to={props.href!} data-testid={props.testid} />
      }
      {props.children}
    </Link>
  );
}

export default AppLink;
