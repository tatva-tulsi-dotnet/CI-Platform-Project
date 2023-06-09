﻿using CIPlatform.Entities.Models;
//using CIPlatform.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CIPlatform.Repository.Repositories
{
    public class HomeRepository : IHomeRepository
    {
        public readonly CiplatformDbContext _db;
        public HomeRepository(CiplatformDbContext db)
        {
            _db = db;
        }


        public IEnumerable<Story> GetStories()
        {

            return _db.Stories.ToList();
        }



        public IEnumerable<User> GetUsers()
        {

            return _db.Users.ToList();

        }

        public IEnumerable<Mission> GetMission()
        {

            return _db.Missions.ToList();


        }



        public IEnumerable<Story> GetTable1WithTable2Records()
        {
            return _db.Stories
            .Include(t1 => t1.User)
            .Include(t2 => t2.Mission)

            .ToList();
        }



        //var user = _db.Users.FirstOrDefault(u => (u.Email == model.Email.ToLower() && u.Password == model.Password));

        public User UserDataforLogin(string emailpara, string passpara)
        {

            var existinguser = _db.Users.FirstOrDefault(u => u.Email == emailpara.ToLower() && u.Password == passpara);

            return existinguser;


        }

        public IEnumerable<MissionTheme> GetMissionThemes()
        {

            return _db.MissionThemes.ToList();

        }
        List<Mission> FinalMissionList = new List<Mission>();
        public List<Mission> GetMissionWithMissionThemeRecords(string[]? themefilter, string[]? cityidarr, string[]? countryidarr, string[]? skillidarr , List<long> finalTopTheme2, List<long> finalFavMission, List<long> finalMostRanked, List<long> finalRandomList)

        {
            if (themefilter != null)
            {
                foreach (var theme in themefilter)
                {
                    var mission = _db.Missions
                    .Where(a => a.ThemeId == Convert.ToInt64(theme) || theme == null)

                    //where m.ThemeId == mt.MissionThemeId
                    .ToList();
                    FinalMissionList.AddRange(mission);

                }

            }

            if (cityidarr != null)
            {
                foreach (var city in cityidarr)
                {
                    var mission = _db.Missions
                    .Where(a => a.CityId == Convert.ToInt64(city) || city == null)

                    //where m.ThemeId == mt.MissionThemeId
                    .ToList();
                    FinalMissionList.AddRange(mission);

                }

            }

            if (countryidarr != null)
            {
                foreach (var country in countryidarr)
                {
                    var mission = _db.Missions
                    .Where(a => a.CountryId == Convert.ToInt64(country) || country == null)

                    //where m.ThemeId == mt.MissionThemeId
                    .ToList();
                    FinalMissionList.AddRange(mission);

                }

            }

            if (skillidarr != null)
            {
                foreach (var skill in skillidarr)
                {
                    var mission = _db.Missions
                      .Include(t1 => t1.MissionSkills)
                    .Where(a => a.MissionId == Convert.ToInt64(skill) || skill == null)

                    .ToList();
                    FinalMissionList.AddRange((IEnumerable<Mission>)mission);

                }

            }

            if (finalTopTheme2.Count != 0) {

                foreach (var a in finalTopTheme2)
                {
                    var mission1 = _db.Missions
                    .Where(b => b.MissionId == a).ToList();
                    FinalMissionList.AddRange((IEnumerable<Mission>)mission1);

                }
            }

            if (finalFavMission.Count != 0)
            {

                foreach (var topmission in finalFavMission)
                {
                    var mission = _db.Missions
                    .Where(b => b.MissionId == topmission).ToList();
                    FinalMissionList.AddRange(
                        mission);

                }
            }
            if (finalMostRanked.Count != 0)
            {

                foreach (var mranked in finalMostRanked)
                {
                    var mission = _db.Missions
                    .Where(b => b.MissionId == mranked).ToList();
                    FinalMissionList.AddRange(
                        mission);

                }
            }
            if (finalRandomList.Count != 0)
            {

                foreach (var random in finalRandomList)
                {
                    var mission = _db.Missions
                    .Where(b => b.MissionId == random).ToList();
                    FinalMissionList.AddRange(
                        mission);

                }
            }

            return FinalMissionList;
        }

        public IEnumerable<MissionSkill> GetSkillandMissionSkill()
        {
            return _db.MissionSkills
            .Include(t1 => t1.Skill)
            .ToList();
        }


        //public IEnumerable<Mission> GetMissionWithMissionThemeRecords()

        //{
        //    return _db.Missions


        //    //.Where(a => a.ThemeId == MissionTheme.MissionThemeId)
        //    .Include(t2 => t2.Theme)
        //    //where m.ThemeId == mt.MissionThemeId
        //    .ToList();
        //}


        public IEnumerable<City> GetCityRecords()
        {

            return _db.Cities.ToList();
        }

        public IEnumerable<Country> GetCountryRecords()
        {
            return _db.Countries.ToList();
        }

        public IEnumerable<Mission> GetSpecificMission(int id)
        {
            var b = id;
            //var specificmission = _db.Missions.Where(a => a.MissionId == b).ToList();
            
            //return specificmission;

            return _db.Missions.Where(a => a.MissionId == b)
                .Include(t1 => t1.City)
                .Include(t2 => t2.Country)
                .Include(t3 => t3.Theme)
                .Include(t4=> t4.GoalMissions).ToList();
        }


        public IEnumerable<Story> GetSpecificStory(int id)
            {
            var b = id;

            return _db.Stories.Where(a => a.StoryId == b)
                .Include(t1 => t1.Mission)
                .Include(t2 => t2.User)
                .ToList();
        }

        public string GetLoginUser(int ids)
        {
            var loginuser = _db.Users.FirstOrDefault(x => (x.UserId == ids));

            var loginfname = loginuser.FirstName;
            var loginlname = loginuser.LastName;

            return loginfname + loginlname;


        }

        public string GetUserEmail(int ids)
        {
            var loginuser = _db.Users.FirstOrDefault(x => (x.UserId == ids));

            return loginuser.Email;
        }

        public IEnumerable<GoalMission> GetGoalMissions()
        {
            return _db.GoalMissions.ToList();
        }

        public IEnumerable<GoalMission> GetTimeGoalBased(int id)
        {
            return _db.GoalMissions.Where(a => a.MissionId == id)
                .Include(t1 => t1.Mission)
                .ToList();
        }

        public IEnumerable<Skill> GetSkills()
        {
            return _db.Skills
                .Include(t1 => t1.MissionSkills).ToList();


        }

        public IEnumerable<UserSkill> GetUserSkillsList()
        {
            return _db.UserSkills.ToList();
        }
        public IEnumerable<Skill> GetUserSkills(int skillsid)
        {
            return _db.Skills.Where(a => a.SkillId == skillsid)
                 .Include(t => t.UserSkills)
                .ToList();
        }
        public IEnumerable<MissionApplication> GetMissionAppList()
        {
            return _db.MissionApplications.ToList();
        }
        public IEnumerable<MissionApplication> Getappliedmissions(int ids)
        {
            return _db.MissionApplications.Where(a => a.UserId == ids)
                .Include(t1 => t1.Mission)
                .Include(t2 => t2.User)
                .ToList();
        }

        public IEnumerable<GoalMission> GetAllGoalMissions(int missionid)
        {
            return _db.GoalMissions.Where(a => a.MissionId == missionid)
                .Include(t1 => t1.Mission)               
                .ToList();
        }

        public IEnumerable<Timesheet> GetTimesheetsList()
        {
            return _db.Timesheets.ToList();
        }

        public IEnumerable<Timesheet> GetTimesheetandMission(int selectedOptionId)
        {
            return _db.Timesheets.Where(a => a.MissionId == selectedOptionId)
                .Include(t1 => t1.Mission)
                .ToList();
        }


        public void deleteusers(int userid)
        {

            var user = _db.Users.Include(u => u.Comments).Include(u => u.Stories).Where(u => u.UserId == userid).ToList();


            var a = _db.Users.FirstOrDefault(user => user.UserId == userid);
            var b = _db.Comments.Where(comments => comments.UserId == userid).ToList();
            var c = _db.Stories.Where(stories => stories.UserId == userid).ToList();



            if (c.Count != 0)
            {
                foreach (var story in c)
                {
                    _db.Stories.Remove(story);
                }
            }
            if (b.Count != 0)
            {
                foreach (var cmnt in b)
                {
                    _db.Comments.Remove(cmnt);
                }
            }


            _db.SaveChanges();
            _db.Users.Remove(a);

            _db.SaveChanges();



        }

        public IEnumerable<CmsPage>GetCMSData()
        {
            return _db.CmsPages.ToList();
        }


        public IEnumerable<MissionMedium> GetMissionMedia()
        {

            return _db.MissionMedia.ToList();

        }

        public IEnumerable<MissionTheme> GetMissionThemess()
        {

            return _db.MissionThemes.ToList();

        }

        public IEnumerable<MissionMedium> GetMissionMediaJoin(long missionid)
        {

            return _db.MissionMedia.Where(a => a.MissionId == missionid);
        }



        public void deletemission(int missionid)
        {
            var mission = _db.Missions.Include(u => u.Comments).Include(u => u.Stories).Where(u => u.MissionId == missionid).ToList();

            Mission a = _db.Missions.FirstOrDefault(mission => mission.MissionId == missionid );
            a.DeletedAt = DateTime.Now;
            _db.SaveChanges();

        }

        public IEnumerable<FavoriteMission> GetFavMissions()
        {
            return _db.FavoriteMissions.ToList();
        }

        public IEnumerable<MissionRating> GetMissionRating()
        {
            return _db.MissionRatings.ToList();

        }
        public IEnumerable<Notification> GetNotifications()
        {
            return _db.Notifications.ToList();
        }
        public IEnumerable<Notification> Getnotiandmissionlist()
        {
            return _db.Notifications
                .Include(t1 => t1.Mission)
                .Include(t2 => t2.User)
                .ToList();
        }


    }


}