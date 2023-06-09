﻿$.getScript("//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js");$(document).ready(function () {    $('#SaveTsByTime').click((e) => saveTimesheetForTimeMission(e));    $('#EditSaveTsByTime').click((e) => EditTimesheetForTimeMission(e));    $('#SaveTsByGoal').click((e) => saveTimesheetForGoalMission(e));    $('#EditSaveTsByGoal').click((e) => EditTimesheetForGoalMission(e));    $('#TsTimeMissionName').change((e) => ChangeTimeDateRange(e));    $('#TsGoalMissionName').change((e) => ChangeGoalDateRange(e));    $('.TimeEdits').on('click', '.deleteTs', function (e) {        e.preventDefault();        var TsId = $(this).data('missionid');        $('#DeleteTs').modal('show');        $('#DeleteRecord').attr('TsId', TsId);    })    $('.GoalEdits').on('click', '.deleteTs', function (e) {        e.preventDefault();        var TsId = $(this).data('missionid');        $('#DeleteTs').modal('show');        $('#DeleteRecord').attr('TsId', TsId);    })    $('.TimeEdits').on('click', '.editTs', function (e) {        e.preventDefault();        var timesheetId = $(this).data('missionid');        $.ajax({            method: 'POST',            url: '/Home/EditTimeTs',            dataType: 'json',            data: {                id: timesheetId            },            success: function (response) {                if (response != null) {                    console.log(response);                    var datesplit = response.volunteerDate.split("-")                    var year = datesplit[0];                    var month = datesplit[1];                    var date = datesplit[2].split("T")[0];                    var datestring = year + "-" + month + "-" + date;                    $('#EditTsByTime').modal('show');                    $('#TimeMissionName').empty();                    $('#TimeMissionName').append("<option value=" + "\"" + response.missionId + "\"" + " selected >" + response.missionName + "</option>");                    $('#TimeTsId').val(response.timeSheetId);                    $('#TimeVlntDate').val(datestring);                    $('#TimeHrs').val(response.volunteerHrs);                    $('#TimeMins').val(response.volunteerMins);                    $('#TimeNotes').val(response.notes);                    //$('#TimeVlntDate').attr("min", response.StartDate);                    //$('#TimeVlntDate').attr("max", response.EndDate);                }                else {                    console.log("Error");                }            },            error: function (xhr, status, error) {                console.log(error);            }        })    })    $('.GoalEdits').on('click', '.editTs', function (e) {        e.preventDefault();        var timesheetId = $(this).data('missionid');        $.ajax({            method: 'POST',            url: '/Home/EditGoalTs',            dataType: 'json',            data: {                id: timesheetId            },            success: function (data) {                console.log(data);                var datesplit = data.volunteerDate.split("-")                var year = datesplit[0];                var month = datesplit[1];                var date = datesplit[2].split("T")[0];                var datestring = year + "-" + month + "-" + date;                $('#EditTsByGoal').modal('show');                $('#GoalMissionName').empty();                $('#GoalMissionName').append("<option value=" + "\"" + data.missionId + "\"" + "selected>" + data.missionName + "</option>");                $('#GoalTsId').val(data.timeSheetId);                $('#GoalVlntDate').val(datestring);                $('#GoalAction').val(data.goalAction);                $('#GoalNotes').val(data.notes);            },            error: function (xhr, status, error) {                console.log(error);            }        })    })})function saveTimesheetForTimeMission(e) {    e.preventDefault();    var saved = "Timesheet saved successfully."    var TimesheetId = $('#TimeTsId').val();    var missionid = $('#TsTimeMissionName').val();    var missionName = $('#TsTimeMissionName option:selected').text();    var date = $('#TsTimeVlntDate').val();    var hrs = $('#TsTimeHrs').val();    var mins = $('#TsTimeMins').val();    var notes = $('#TsTimeNotes').val();    if (missionid == null || missionid == "") {        $('#TMissionValidation').text("Please select a mission.");    }    if (date == null || date == "") {        $('#TDateValidation').text("Please select a date.");    }    if (hrs == null || hrs == "") {        $('#THoursValidation').text("Please enter hours.");    }    if (mins == null || mins == "") {        $('#TMinsValidation').text("Please enter minutes.");    }    if (notes == null || notes == "") {        $('#TNotesValidation').text("Please write some note.")    }    $.ajax({        type: 'POST',        url: '/Home/TimesheetForTime',        data: {            timesheetId: TimesheetId,            missionId: missionid,            VDate: date,            Vhours: hrs,            Vmins: mins,            VNote: notes        },        success: function (response) {            showSuccessToastr(saved);            $('#TsByTime').modal('hide');            $('#TsByTimeTable').append("<tr><td scope=\"row\">" + missionName + "</td><td>" + date + "</td> <td>" + hrs + "</td><td>" + mins + "</td><td class\"text-center\"><div class=\"btn - group\" role=\"group\"><button class=\"btn editTs\" data-missionid=" + missionid + "><i class=\"bi bi-pencil-square\"></i></button><button class=\"btn deleteTs\" data-missionid=" + missionid + "><i class=\"bi bi-trash\"></i></button></div></td></tr >");        },        error: function (xhr, status, error) {            console.log(error);        }    })}function saveTimesheetForGoalMission(e) {    e.preventDefault();    var saved = "Timesheet saved successfully."    var TimesheetId = $('#GoalTsId').val();    var missionid = $('#TsGoalMissionName').val();    var missionName = $('#TsGoalMissionName option:selected').text();    var action = $('#TsGoalAction').val();    var date = $('#TsGoalVlntDate').val();    var notes = $('#TsGoalNotes').val();    if (missionid == null || missionid == "") {        $('#GMissionValidation').text("Please select a mission.");    }    if (date == null || date == "") {        $('#GDateValidation').text("Please select a date.");    }    if (notes == null || notes == "") {        $('#GNoteValidation').text("Please write some note.")    }    $.ajax({        type: 'POST',        url: '/Home/TimesheetForGoal',        data: {            timesheetId: TimesheetId,            missionId: missionid,            gAction: action,            gDate: date,            gNotes: notes        },        success: function (response) {            if (response) {                showSuccessToastr(saved);                $('#TsByGoal').modal('hide');                $('#TsByGoalTable').append("<tr><td scope=\"row\">" + missionName + "</td><td>" + date + "</td><td>" + action + "</td><td class\"text-center\"><button class=\"btn editTs\"><i class=\"bi bi-pencil-square\"></i></button><button class=\"btn deleteTs\"><i class=\"bi bi-trash\"></i></button></td></tr >");            }        },        error: function (xhr, status, error) {            console.log(error);        }    })}function ChangeTimeDateRange(e) {    e.preventDefault();    var sDate = $('#TsTimeMissionName option:selected').data('startdate');    var eDate = $('#TsTimeMissionName option:selected').data('enddate');    $('#TsTimeVlntDate').val(eDate);    var fullDate = new Date()    var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);    var currentDate = fullDate.getDate() + "-" + twoDigitMonth + "-" + fullDate.getFullYear();    if (eDate > currentDate) {        eDate = currentDate;    }    sDate = convertDate(sDate);    eDate = convertDate(eDate);    $('#TsTimeVlntDate').attr("min", sDate);    $('#TsTimeVlntDate').attr("max", eDate);}function ChangeGoalDateRange(e) {    e.preventDefault();    var sDate = $('#TsGoalMissionName option:selected').data('startdate');    var eDate = $('#TsGoalMissionName option:selected').data('enddate');    $('#TsGoalVlntDate').val(eDate);    var fullDate = new Date()    var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);    var currentDate = fullDate.getDate() + "-" + twoDigitMonth + "-" + fullDate.getFullYear();    if (eDate > currentDate) {        eDate = currentDate;    }    sDate = convertDate(sDate);    eDate = convertDate(eDate);    $('#TsGoalVlntDate').attr("min", sDate);    $('#TsGoalVlntDate').attr("max", eDate);}function EditTimesheetForTimeMission(e) {    e.preventDefault();    var saved = "Timesheet updated successfully."    var html = $(this).data('missionid');    var TimesheetId = $('#TimeTsId').val();    var missionid = $('#TimeMissionName').val();    var missionName = $('#TimeMissionName option:selected').text();    var date = $('#TimeVlntDate').val();    var hrs = $('#TimeHrs').val();    var mins = $('#TimeMins').val();    var notes = $('#TimeNotes').val();    //if (missionid == null || missionid == "") {    //    $('#TMissionValidation').text("Please select a mission.");    //}    //if (date == null || date == "") {    //    $('#TDateValidation').text("Please select a date.");    //}    if (hrs == null || hrs == "") {        $('#THoursValidation').text("Please enter hours.");    }    if (mins == null || mins == "") {        $('#TMinsValidation').text("Please enter minutes.");    }    if (notes == null || notes == "") {        $('#TNotesValidation').text("Please write some note.")    }    $.ajax({        type: 'POST',        url: '/Home/TimesheetForTime',        data: {            timesheetId: TimesheetId,            missionId: missionid,            VDate: date,            Vhours: hrs,            Vmins: mins,            VNote: notes        },        success: function (response) {            console.log(html);            $('#EditTsByTime').modal('hide');            location.reload();        },        error: function (xhr, status, error) {            console.log(error);        }    })}function EditTimesheetForGoalMission(e) {    e.preventDefault();    var saved = "Timesheet updated successfully."    var TimesheetId = $('#GoalTsId').val();    var missionid = $('#GoalMissionName').val();    var missionName = $('#GoalMissionName option:selected').text();    var action = $('#GoalAction').val();    var date = $('#GoalVlntDate').val();    var notes = $('#GoalNotes').val();    //if (missionid == null || missionid == "") {    //    $('#GMissionValidation').text("Please select a mission.");    //}    //if (date == null || date == "") {    //    $('#GDateValidation').text("Please select a date.");    //}    if (notes == null || notes == "") {        $('#GNoteValidation').text("Please write some note.")    }    $.ajax({        type: 'POST',        url: '/Home/TimesheetForGoal',        data: {            timesheetId: TimesheetId,            missionId: missionid,            gAction: action,            gDate: date,            gNotes: notes        },        success: function (response) {            if (response) {                $('#EditTsByGoal').modal('hide');                location.reload();            }        },        error: function (xhr, status, error) {            console.log(error);        }    })}function convertDate(date) {    var cDate = date.split("-").reverse().join("-");    return cDate;}function DeletePermanently() {    var id = $('#DeleteRecord').attr('TsId');    $.ajax({        method: 'DELETE',        url: '/Home/DeleteTimesheet',        data: {            id: id        },        success: function (response) {            if (response) {                $('#DeleteTs').modal('hide');                location.reload();            }        },        error: function (xhr, status, error) {            console.log(error);        }    })}function showSuccessToastr(msg) {    toastr["success"](msg);}function showErrorToastr(msg) {    toastr["error"](msg);}