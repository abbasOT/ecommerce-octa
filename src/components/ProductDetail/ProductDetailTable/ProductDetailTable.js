import React from 'react';
import { Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { ProductDetailStyles } from '@/components/Ui/Styles/Styles';
import './Table.css';


function ProductDetailTable() {
    return (
        <div>
            <Box sx={ProductDetailStyles.productDetailTableContainerBox}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    ...ProductDetailStyles.TableHeadings,
                                    ...ProductDetailStyles.headTableCellStyles
                                }}
                            >
                                Wire Number
                            </TableCell>
                            <TableCell sx={{ ...ProductDetailStyles.TableHeadings, paddingLeft: '2rem' }}>Wire Colour</TableCell>
                            <TableCell
                                sx={{
                                    ...ProductDetailStyles.TableHeadings,
                                    ...ProductDetailStyles.headTableCellStyles,
                                    paddingLeft: '2rem',
                                }}
                            >
                                Description
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell
                                    sx={{
                                        ...ProductDetailStyles.TableHeadings,
                                        ...ProductDetailStyles.TableCellStyle,
                                        ...ProductDetailStyles.rowTableCellBorderStyles,
                                        paddingLeft: '2.5rem',
                                        ...(index % 2 === 1 && alternatingBackground), // Apply alternating background
                                    }}
                                >
                                    {row.wireNumber}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        ...ProductDetailStyles.TableHeadings,
                                        ...ProductDetailStyles.TableCellStyle,
                                        paddingLeft: '2rem',
                                        ...(index % 2 === 1 && alternatingBackground), // Apply alternating background
                                    }}
                                >
                                    {row.wireColor}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        ...ProductDetailStyles.TableHeadings,
                                        ...ProductDetailStyles.TableCellStyle,
                                        ...ProductDetailStyles.rowTableCellBorderStyles,
                                        paddingLeft: '0.5rem',
                                        ...(index % 2 === 1 && alternatingBackground), // Apply alternating background
                                    }}
                                >
                                    {row.description}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </div>
    );
}

export default ProductDetailTable;


const alternatingBackground = { background: '#F9F9F9' };

const data = [
    { id: 1, wireNumber: '1', wireColor: 'Brown', description: 'Ground wire connected to the ground of system' },
    { id: 2, wireNumber: '2', wireColor: 'Red', description: 'Powers the motor typically +5V is used' },
    { id: 3, wireNumber: '3', wireColor: 'Orange', description: 'PWM signal is given in through this wire to drive the motor' },
    { id: 4, wireNumber: '4', wireColor: 'dark', description: 'PWM signal is given in through this wire to drive the motor' },
    { id: 5, wireNumber: '5', wireColor: 'blue', description: 'PWM signal is given in through this wire to drive the motor' },
];
