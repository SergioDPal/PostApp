import { FadingBanner } from '../components/FadingBanner/FadingBanner';
import {
  useNavigateToHomeIfNoToken,
  useNavigateToHomeIfToken,
} from '../hooks/useNavigateIfCondition';
import { deleteLocalStorage } from './deleteLocalStorage';
import { useWindowDimensions } from '../hooks/useWindowDimensions';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { throwError } from './throwError';

export {
  FadingBanner,
  useNavigateToHomeIfNoToken,
  useNavigateToHomeIfToken,
  deleteLocalStorage,
  useWindowDimensions,
  useLocalStorage,
  throwError,
};
