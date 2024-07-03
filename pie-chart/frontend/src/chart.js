import React from 'react';
import DonutChart from 'react-donut-chart';

function PIE_CHART() {
    return (
        <DonutChart
            data={[
                {
                    label: 'Give you up',
                    value: 25,
                },
                {
                    label: 'Other',
                    value: 75,
                    isEmpty: true,
                },
            ]}
            colors={['#ff9999', '#66b3ff']}
            emptyColor='#e0e0e0'
            innerRadius={0.6}
            outerRadius={0.9}
            legend={true}
        />
    );
};

export default PIE_CHART;