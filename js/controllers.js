'use strict';
/* Controllers */
var sklController = angular.module('sklController', []);
var baseUrl = 'https://www.squarehospital.com/';
sklController.controller('controllerBotValley', function ($timeout, $scope, $http, $window, $location, $anchorScroll, $mdDialog, $filter) {

    $scope.onDateChange = function (date) {

        $scope.cannotMakeAppointmentOnThisMonth = null;

        // $scope.branches = null;
        // $scope.specialities = null;
        // $scope.doctors = null;
        $scope.appointmentSlots = null;
        $scope.appointment.timeSlot = null;

        var d = new Date();
        var selectedMonth = $filter('date')(date,'MM');
        var thisMonth = $filter('date')(d,'MM');
        var today = $filter('date')(d,'dd');

        if((selectedMonth > thisMonth && today < 28))
        {

            $scope.cannotMakeAppointmentOnThisMonth = 1;


        }



    };

    $scope.lorem = 1234;

    $scope.slotStatusNow = {
        lorem : 0
    };

    $scope.slotStatusError = 0;


    $scope.dateFormat = function (date) {
        $scope.program_date_formatted = $filter('date')(date,'yyyy-MM-dd');
    };

    $scope.dateFormat2 = function (date) {
        return $filter('date')(date,'yyyy-MM-dd');
    };

    $scope.timeFormat = function (time) {
        $scope.program_time_formatted = $filter('date')(time,'hh:mm: a');
    };

    $scope.branchList = function (data) {

        $http.get(baseUrl + 'api/branchList/' + data ).then(function (response) {


            $scope.branches = response.data.return;
            // console.log($scope.branches);

            $scope.specialities = null;
            $scope.doctors = null;
            $scope.appointmentSlots = null;



        });
    };

    $scope.specialityList = function (data) {

        $http.get(baseUrl + 'api/specialityList/' + data ).then(function (response) {


            $scope.specialities = response.data.return;


            $scope.doctors = null;
            $scope.appointmentSlots = null;




        });
    };

    $scope.doctorList = function (specialityID,branchId,scDate) {

        //console.log($filter('date')(scDate,'yyyyMMdd'));

            $http.get(baseUrl + 'api/fetchAllDoctorSpecialityAndBranchWise/' + specialityID + '/'+ branchId + '/' + $filter('date')(scDate,'yyyyMMdd')).then(function (response) {


                $scope.doctors = response.data;

                $scope.appointmentDoctorName = $scope.doctors.doctorName;
                $scope.appointmentSlots = null;




            });
        };


    $scope.appointmentSlot = function (date,doctorId,branchID, timeSlot) {

            $http.get(baseUrl + 'api/fetchDateWiseSlot/' + $filter('date')(date,'dd-MM-yyyy') + '/' +doctorId +'/'+ branchID+'/'+ timeSlot).then(function (response) {


                $scope.appointmentSlots = response.data;


                console.log(response.data);

                //console.log($filter('date')(date,'dd-MM-yyyy'));
                //console.log(1234);

            });
        };

    $scope.clearAppointmentSlot = function () {

        $scope.appointmentSlots = [];

    };

        $scope.selectedSlotInfo = function (scID,slNo,slotStartTime,slotEndTime) {
            $scope.scID             = scID;
            $scope.slNo             = slNo;
            $scope.slotStartTime    = slotStartTime;
            $scope.slotEndTime      = slotEndTime;
            console.log($scope.slNo);
        };


    $scope.getPhoneNumberHints = function(hn){

        if (hn == null){

            $scope.showPhoneNumberHints = null;

        }else{

            $http.get(baseUrl + 'api/getPatientPhoneNumber/'+ hn).then(function (response) {


                $scope.showPhoneNumberHints = response.data.return;


                console.log(response.data);


            });

        }



    };

    $scope.getPatientInfo = function (hn, phone) {

            $http.get(baseUrl + 'api/getPatientInfo/' + hn +'/'+ phone).then(function (response) {

                // $scope.appointment.HN = response.data.return.hn;
                $scope.appointment.name = response.data.return.name;
                $scope.appointment.date_of_birth = $filter('date')(response.data.return.dob,'dd-MM-yyyy');
                // $scope.appointment.age = response.data.return.ageInt;
                $scope.appointment.gender = response.data.return.gender;
                // $scope.appointment.phone = response.data.return.phone;

                // console.log(response.data.return);

                var today = new Date();

                var dob = new Date($filter('date')(response.data.return.dob,'yyyy-MM-dd'));

                var dateDiff = Math.floor(today.getTime() - dob.getTime());

                var day = 1000 * 60 * 60 * 24;

                var days = Math.floor(dateDiff/day);
                var months = Math.floor(days/31);
                var years = Math.floor(months/12);

                console.log(years, months, day);

                if (response.data.return.ageInt <= 0){

                    if (days <= 30){

                        $scope.appointment.age = days;
                        $scope.appointment.ymd = 3

                    }else if (years <= 0){

                        $scope.appointment.age = months;
                        $scope.appointment.ymd = 2

                    }else{

                        $scope.appointment.age = years;
                        $scope.appointment.ymd = 1

                    }


                }else{

                    $scope.appointment.age = response.data.return.ageInt
                }

                var phoneNumbers = response.data.return.phone;
                var phone = phoneNumbers.split(',');
                $scope.appointment.phone = phone[0];
                // console.log(phone[0]);


            });
        };



    $scope.skl = function () {

        $scope.slotStatusNow.lorem = 1;
    };

    $scope.slotConfirmation = function (
        hn,patientName,phone,gender,age,ymd,scID,date,slNO,slotStartTime,slotEndTime,branchID
    ) {

        if(hn == undefined || hn == null ){

            hn = 0
        }

        var info={


            browserName         : navigator.appName,
            browserEngine       : navigator.product,
            browserVersion1a    : navigator.appVersion,
            browserVersion1b    : navigator.userAgent,
            browserLanguage     : navigator.language,
            browserOnline       : navigator.onLine,
            browserPlatform     : navigator.platform,
            javaEnabled         : navigator.javaEnabled(),
            dataCookiesEnabled  : navigator.cookieEnabled,
            dataCookies1        : document.cookie,
            dataCookies2        : decodeURIComponent(document.cookie.split(";")),
            dataStorage         : localStorage                                      ,

            sizeScreenW         : screen.width,
            sizeScreenH         : screen.height,
            sizeDocW            : document.width,
            sizeDocH            : document.height,
            sizeInW             : innerWidth,
            sizeInH             : innerHeight,
            sizeAvailW          : screen.availWidth,
            sizeAvailH          : screen.availHeight,
            scrColorDepth       : screen.colorDepth,
            scrPixelDepth       : screen.pixelDepth



        };

        console.log('HN:'+hn);

        $http({
            method: 'POST',
            url: baseUrl + 'api/slotConfirmation/' + hn + '/' + patientName + '/' + phone + '/' + gender + '/' + age+' '+ ymd + '/' + scID + '/' + $filter('date')(date,'dd-MM-yyyy') + '/' + slNO + '/' + slotStartTime + '/' + slotEndTime + '/' + branchID,
            data: {
                browserPlatform     : navigator.platform,
                browser             : navigator.userAgent,
                dataCookies1        : document.cookie,
                dataCookies2        : decodeURIComponent(document.cookie.split(";")),
                sizeScreenW         : screen.width,
                sizeScreenH         : screen.height

            }
        }).then(function successCallback(response) {
            console.log(response);
            if(response.data.return == 'S'){
                $scope.skl();
            }else{
                $scope.slotStatusError = 1;
            }
        }, function errorCallback(response) {
            console.log(response);
        });


        // $http.get(baseUrl + 'd/api/slotConfirmation/' + hn + '/' + patientName + '/' + phone + '/' + gender + '/' + age+' '+ ymd + '/' + scID + '/' + $filter('date')(date,'dd-MM-yyyy') + '/' + slNO + '/' + slotStartTime + '/' + slotEndTime + '/' + branchID + '?' + 'browserPlatform ='+ info.browserPlatform + '&dataCookies1=' + info.dataCookies1 +'&dataCookies2='+info.dataCookies2+'&sizeScreenW='+info.sizeAvailW+'&sizeScreenH='+ info.sizeAvailH )
        //     .then(function (response) {
        //
        //         if(response.data.return == 'S'){
        //             $scope.skl();
        //         }
        //
        //
        //
        //
        //
        //
        // });
    };


    this.myDate = new Date();
    this.isOpen = false;



    $scope.doctorsList = null;

    $scope.getDoctors = function (doctorName, doctorDepartmentId) {

        //console.log(doctorName);
        //console.log(doctorDepartmentId);

        $http({
            method: 'POST',
            url: baseUrl + 'api/getDoctors',
            data: {doctorName: doctorName, doctorDepartmentId: doctorDepartmentId}
        }).then(function successCallback(response) {
            if (response.data) {

                $scope.doctorsList = response.data;
                console.log(response.data);

            }
        }, function errorCallback(response) {
            console.log(response);
        });


    };

    $scope.makeSlug = function (title) {

        var str = title;

        str = str.replace(/\s+/g, '-').toLowerCase();

        $scope.slug = str;

    };


    $scope.getImages = function (offset) {


        $http.get(baseUrl + 'api/images/' + offset).then(function (response) {


            $scope.images = response.data.images;

            if (offset <= 0) {
                $scope.offsetPrev = 0;
            } else {

                $scope.offsetPrev = offset - 15;
            }

            if (offset >= response.data.totalImageCount) {
                $scope.offsetNext = offset;

            } else {

                $scope.offsetNext = offset + 15;

            }


        });


    };


    $scope.setImage = function (imageId, imageName) {
        $scope.articleImageId = imageId;
        $scope.articleImageName = imageName;
        $scope.images = null;
    };





});

