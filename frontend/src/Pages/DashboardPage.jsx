import React from "react";
import { Avatar, Card } from "antd";
import Chart from "react-apexcharts";
const { Meta } = Card;

const cardItems = [
  ["20", "Teachers"],
  ["120", "Students"],
  ["40", "Courses"],
  ["3", "Admins"],
];

const DashboardPage = () => {
    const donutOptions = {
      chart: {
        id: "basic-donut",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
    
    const donutSeries = [44, 55, 41, 17, 15];
        
    const lineOptions = {
      chart: {
        id: "basic-line",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
      yaxis: {
        title: {
          text: "Value",
        },
      },
    };

    const lineSeries = [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ];

    const columnOptions = {
      chart: {
        id: "basic-column",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
      yaxis: {
        title: {
          text: "Value",
        },
      },
    };

    const columnSeries = [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ];
  return (
    <div className='p-4'>
      <div className='flex flex-wrap gap-2 my-4'>
        {cardItems.map((item, index) => {
          return (
            <Card
              style={{
                width: 300,
              }}
              key={index}>
              <Meta
                avatar={<h2 className='text-3xl font-bold'>{item[0]}</h2>}
                title={item[1]}
                description='Registered'
              />
            </Card>
          );
        })}
      </div>

      <div className='flex flex-wrap gap-4 my-4'>
        <Card
          title='Website Visits'
          className='w-fit'
          bordered={false}>
          <Chart
            options={lineOptions}
            series={lineSeries}
            type='line'
            width='500'
          />
        </Card>
        <Card
          title='Members Percentages'
          className='w-fit'
          bordered={false}>
          <Chart
            options={donutOptions}
            series={donutSeries}
            type='polarArea'
            width='500'
          />
        </Card>
        <Card
          title='Attendances Recorded'
          className='w-fit'
          bordered={false}>
          <Chart
            options={columnOptions}
            series={columnSeries}
            type='bar'
            width='500'
          />
        </Card>
      </div>
    </div>
  );
};
export default DashboardPage;
