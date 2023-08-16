import { Navigate, Outlet } from 'react-router-dom';
import { CustomerState } from '../features/customer/customerSlice';

type PrivateRoutesProps = Omit<CustomerState, 'email' | 'token' | 'message' | 'address'>;

const PrivateRoutes = (props: PrivateRoutesProps) => {
  return(
    props.authorized ? <Outlet /> : <Navigate to='/signin' />
  );
}

export default PrivateRoutes;
