const getClassName = (cellValue: string, columnIndex: number) => {
    if (columnIndex === 0) {
        return 'title-cell';
    } else if (cellValue === 'Retained') {
        return 'value-cell-retained';
    } else if (cellValue === 'Rejected') {
        return 'value-cell-rejected';
    } else {
        return 'value-cell';
    }
}

export default getClassName;