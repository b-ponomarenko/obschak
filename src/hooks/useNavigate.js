import { useDispatch } from 'react-redux';
import navigateTo from '../actions/navigateTo';
import { useCallback } from 'react';

const useNavigate = () => {
    const dispatch = useDispatch();
    return useCallback((...args) => dispatch(navigateTo(...args)), []);
};

export default useNavigate;
