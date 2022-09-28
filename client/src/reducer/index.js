const initialState = {
  pokemons: [],
  tipos: [],
  copiaPokemons: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        copiaPokemons: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        tipos: action.payload,
      };
    case "FILTER_BY_TYPE":
      const allPokemons = state.copiaPokemons;
      const statusFiltered =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter((el) => el.types.includes(action.payload));
      return {
        ...state,
        pokemons: statusFiltered,
      };

    case "FILTER_CREATED":
      const allPokemons2 = state.copiaPokemons;
      const createdFilter =
        action.payload === "db"
          ? allPokemons2.filter((el) => el.createdInDb)
          : allPokemons2.filter((el) => !el.createdInDb);
      return {
        ...state,
        pokemons:
          action.payload === "todos" ? state.allPokemons2 : createdFilter,
      };

    case "ORDER_BY_NAME":
      let sortedArr = [];
      if (action.payload === "nasc") {
        sortedArr = state.pokemons.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "ndes") {
        sortedArr = state.pokemons.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        pokemons: sortedArr,
      };
    case "ORDER_BY_ATTACK":
      let sortedArrAttack = [];
      if (action.payload === "aasc") {
        sortedArrAttack = state.pokemons.sort(function (a, b) {
          if (a.attack > b.attack) {
            return 1;
          }
          if (b.attack > a.attack) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "ades") {
        sortedArrAttack = state.pokemons.sort(function (a, b) {
          if (a.attack > b.attack) {
            return -1;
          }
          if (b.attack > a.attack) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        pokemons: sortedArrAttack,
      };

    case "GET_NAME_POKEMON":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
	case "POST_CHARACTER":
		return{
			...state
		};
    default:
      return state;
  }
}

export default rootReducer;
