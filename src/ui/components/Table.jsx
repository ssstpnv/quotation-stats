import './Table.css';

const Table = ({ rowHeaders, rows }) => {
    return (
        <table className="table">
            {rowHeaders.length && (
                <thead>
                    <tr>
                        {rowHeaders.map((header) => (
                            <th key={header}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
            )}
            <tbody>
            {rows.map((row) => {
                const { id, ...rest } = row;
                return (
                    <tr key={id}>
                        {Object.values(rest).map((rowCellValue) => (
                            <td>{rowCellValue}</td>
                        ))}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

export default Table;