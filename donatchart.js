Highcharts.chart('completedDonut', {
    chart: {
        type: 'pie',
        backgroundColor: 'transparent'
    },
    title: { text: null },
    credits: { enabled: false },
    tooltip: { enabled: false },
    exporting: { enabled: false },
    plotOptions: {
        pie: {
            dataLabels: { enabled: false },
            states: { hover: { enabled: false } }
        }
    },
    series: [
        {
            // Background track (full gray ring)
            name: 'Track',
            size: '100%',
            innerSize: '68%',
            borderWidth: 0,
            enableMouseTracking: false,
            data: [
                { y: 100, color: '#E5E5E5' }
            ]
        },
        {
            // Value ring (green fill on top of track)
            name: 'Completed',
            size: '100%',
            innerSize: '68%',
            borderRadius: 50,
            borderWidth: 0,
            startAngle: 0,
            data: [
                { y: 93, color: '#1CD23A' },
                { y: 7, color: 'rgba(0,0,0,0)' } // invisible remainder
            ]
        }
    ]
});