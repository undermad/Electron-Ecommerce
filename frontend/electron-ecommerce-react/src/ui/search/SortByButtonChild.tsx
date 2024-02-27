type SortByButtonChildProps = {
    name: string,
    queryParam: string,
    direction: string,
    callback: (sortBy: string, direction: string, displayText: string) => void,
}

export const SortByButtonChild = ({name, queryParam, direction, callback}: SortByButtonChildProps) => {

    return (
        <button
            onClick={() => callback(queryParam, direction, name)}
            className="w-full p-2 rounded-lg text-gray-700 hover:bg-electron-very-light-blue text-left">
            Sort By: {name}
        </button>
    )
}