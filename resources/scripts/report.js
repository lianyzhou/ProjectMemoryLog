angular.module("webapp",[])
.filter('time' , [function() {
	return function(str) {
		return moment(str).format('HH:mm:ss');
	};
}])
.directive('chart' , [function() {
	
	return {
		restrict : "EA",
		scope : true ,
		link : function($scope,el,attrs) {
			
			function render() {
				var times = $scope.chart.times;
				var memory = $scope.chart.memory;
				var option = {
				    title : {
				        show :false
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    legend: {
				    	x : -100,
				    	y : -100,
				        data:['内存']
				    },
				    toolbox: {
				        show : true,
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {show: true, type: ['line', 'bar']},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            data : times
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'内存',
				            type:'line',
				            data:memory,
				            markPoint : {
				                symbol:'emptyCircle',
				                effect : {
				                    show: true,
				                    shadowBlur : 0
				                },
				                itemStyle:{
				                    normal:{
				                        label:{show:false}
				                    }
				                },
				                data : [
				                    {type : 'max', name: '最大值',symbolSize:8},
				                    {type : 'min', name: '最小值',symbolSize:8}
				                ]
				            },
				            markLine : {
				                data : [
				                    {type : 'average', name: '平均值'}
				                ]
				            }
				        }
				    ]
				};
	            var chart = echarts.init($(el)[0]);
	            chart.setOption(option);	
			}
			var timer;
			$(window).resize(function() {
				clearTimeout(timer);
				timer = setTimeout(render , 100);
			});
			render();
		}
	};
}])
.controller("ReportCtrl", ["$scope","$http",function($scope,$http) {
	
	$scope.monthGroups;
	$scope.months ;
	$scope.selectMonth;
	$scope.dates;
	$scope.charts;
	
	function getMonths() {
		$http.get('/log/dates').success(function(ret) {
			var groups = _.groupBy(ret , function(str) {
				return str.match(/^\d{4}\-\d{2}/)[0];
			});
			$scope.monthGroups = groups;
			$scope.months = Object.keys(groups);
			$scope.months = _.sortBy($scope.months , function(str) {
				return -1 * moment(str,"YYYY-MM").toDate().getTime();
			});
			$scope.selectMonth = $scope.months[0];
			getDates();
		});
		
	}

	function getDates() {
		$scope.dates = _.sortBy($scope.monthGroups[$scope.selectMonth] , function(str) {
			return -1 * moment(str).toDate().getTime();
		});
		$scope.selectDate = $scope.dates[0];
		getChartsData();
	}

	function getChartsData() {
		$http({
			method : "GET",
			url : "/log/charts",
			params : {
				date : $scope.selectDate
			}
		}).success(function(ret) {
			$scope.charts = ret;
		});
	}

	function monthChange() {
		getDates();
		getChartsData();
	}

	getMonths();

	$scope.getChartsData = getChartsData;
	$scope.monthChange = monthChange;
}]);