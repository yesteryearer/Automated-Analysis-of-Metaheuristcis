const arrayToLatexTable = (array: string[][], title: string): void => {
    let latexTable = "\\begin{table}[H]\n\\begin{tabular}{l|";

    latexTable += array[0].slice(1).map(() => "l").join(" ") + "}\n";

    array.forEach((row, index) => {
        latexTable += row.join(" & ") + " \\\\\n";
        if (index === 0) {
            latexTable += "\\hline\n";
        }
    });

    latexTable += "\\multicolumn{" + array[0].length + "}{c}{" + title + "}\n";

    latexTable += "\\end{tabular}\n\\end{table}";

    navigator.clipboard.writeText(latexTable)
        .then(() => console.log("Latex table copied to clipboard"))
        .catch(err => console.error("Could not copy text: ", err));
};

export default arrayToLatexTable;

