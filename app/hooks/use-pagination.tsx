import { useReducer } from "react";

// Définissez votre action type, par exemple 'SET_PAGINATION'
const SET_PAGINATION = "SET_PAGINATION";
const STEP = 2;

// Définissez le type pour l'état de la pagination
interface PaginationState {
  start: number;
  end: number;
}

// Définissez le type pour l'action de la pagination
interface SetPaginationAction {
  type: typeof SET_PAGINATION;
  payload: Partial<PaginationState>; // Utilisez Partial pour rendre les propriétés optionnelles
}

// Union de tous les types d'actions possibles
type PaginationAction = SetPaginationAction;

const paginationReducer = (
  state: PaginationState,
  action: PaginationAction
): PaginationState => {
  switch (action.type) {
    case SET_PAGINATION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default function usePagination() {
  const [pagination, dispatch] = useReducer(paginationReducer, {
    start: 0,
    end: STEP,
  });

  const setPagination = (newPagination: Partial<PaginationState>) => {
    dispatch({
      type: SET_PAGINATION,
      payload: {
        start: (newPagination.start || 0) + STEP,
        end: (newPagination.end || STEP) + STEP,
      },
    });
  };

  return { pagination, setPagination };
}
