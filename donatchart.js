Highcharts.chart('completedDonut', {
    chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        
    },
    title: { text: null },
    credits: { enabled: false },
    tooltip: { enabled: false },
    exporting: { enabled: false },
    plotOptions: {
        pie: {
             size: '100%',  
            dataLabels: { enabled: false }
        }
    },
    series: [
        {
            name: 'Completed',
            innerSize: '58%',
            borderWidth: 0,
            
            data: [
                { name: 'Completed', y: 93, color: '#1CD23A' },
                { name: 'Remaining', y: 7, color: '#E5E5E5' }
            ]
        }
    ]
});