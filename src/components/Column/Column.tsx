import React, { FC } from 'react';

import { Row, RowProps } from 'src/components/Row';

export type ColumnProps = RowProps;

const ColumnComponent: FC<ColumnProps> = props => <Row flexDirection='column' {...props} />;

export default ColumnComponent;
