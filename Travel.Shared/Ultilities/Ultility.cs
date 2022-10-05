using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Travel.Context.Models;
using Travel.Shared.ViewModels;

namespace Travel.Shared.Ultilities
{
   
    public static class Ultility
    {
        private static Notification message = new Notification();
        private static Image image = new Image();

        public static string GenerateRandomCode()
        {
            Random random = new Random();
            string s = "";
            for (int i = 0; i < 6; i++)
                s = String.Concat(s, random.Next(10).ToString());
            return s;
        }

        #region String Handle
        public static string removeVietnameseSign(string content)
        {
            string temp = "";

            if (!string.IsNullOrEmpty(content))
            {
                try
                {
                    Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
                    temp = content.Normalize(NormalizationForm.FormD).Trim();
                    Array BadCommands = ";,--,create,drop,select,insert,delete,update,union,sp_,xp_".Split(new Char[] { ',' });
                    temp = (regex.Replace(temp, String.Empty)
                        .Replace('\u0111', 'd')
                        .Replace('\u0110', 'D')
                        .Replace(",", " ")
                        .Replace(".", " ")
                        .Replace(":", " ")
                        .Replace("!", " ")
                        .Replace(";", " ")
                        .Replace("/", " ")
                        .Replace("&", " ")
                        .Replace("%", " ")
                        .Replace("*", " ")
                        .Replace("?", " "));
                }
                catch { temp = ""; }
            }
            return temp;
        }
        #endregion

        #region Date Handle
        public static string CountDay(DateTime fromdate, DateTime todate)
        {
            string result = string.Empty;
            if (fromdate == DateTime.MinValue || todate == DateTime.MinValue || fromdate > todate)
            {
                result = "N/A";
            }
            else
            {
                if (fromdate.ToString("yyyyMMdd") == todate.ToString("yyyyMMdd"))
                {
                    result = "1 ngày";
                }
                else
                {
                    var day = (todate.Date - fromdate.Date).TotalDays;
                    result = string.Format("{0}N{1}Đ", day + 1, day);

                    DateTime fDate = fromdate;
                    while (fDate.ToString("yyyyMMdd") != todate.ToString("yyyyMMdd"))
                    {
                        day++;
                        fDate = fromdate.AddDays(day);
                    }
                    result = string.Format("{0}N{1}Đ", day + 1, day);
                }
            }
            return result;
        }
        public static DateTime GetDateZeroTime(DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, 0, 0, 1);
        }
        #endregion



        public static Image WriteFile(IFormFile file, string type, Guid Id, ref Notification _message)
        {
            try
            {
                var folder = Directory.GetCurrentDirectory() + @"\wwwroot";
                string path = Path.Combine(folder, "Uploads");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                string pathType = Path.Combine(path, type);

                if (!Directory.Exists(pathType))
                {
                    Directory.CreateDirectory(pathType);
                }

                string pathId = Path.Combine(pathType, Id.ToString());

                if (!Directory.Exists(pathId))
                {
                    Directory.CreateDirectory(pathId);
                }


                var date = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss");

                string pathDate = Path.Combine(pathId, FormatDateToInt(date, "YYYYMMDD").ToString());
                if (!Directory.Exists(pathDate))
                {
                    Directory.CreateDirectory(pathDate);
                }
                //get file extension
                string[] str = file.FileName.Split('.');

                string fileName = Guid.NewGuid().ToString() + "." + str[1];

                string fullpath = Path.Combine(pathDate, fileName);

                string serverPath = "/Uploads/" + type + "/" + Id + "/" + FormatDateToInt(date, "YYYYMMDD").ToString() + "/" + fileName;
                if (Directory.Exists(fullpath))
                {
                    System.IO.File.Delete(fullpath);

                }
                using (var stream = new FileStream(fullpath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                image.Id = Guid.NewGuid();
                image.Name = fileName;
                image.Extension = str[1];
                image.IdService = Id;
                image.Size = file.Length;
                image.FilePath = serverPath;
                return image;
            }
            catch (Exception e)
            {
                message.Messenge = "Có lỗi xảy ra khi lưu file !";
                message.Type = "Error";
                message.Description = e.Message;
                _message = message;

                return image;
            }
        }

        //public static void SendMail(UserModel userModel, string password, string url, ref NotificationModel _message)
        //{
        //    try
        //    {
        //        //var url = "http://localhost:4200/#/login";
        //        SmtpClient Client = new SmtpClient("smtp.gmail.com", 587);
        //        Client.UseDefaultCredentials = false;
        //        Client.EnableSsl = true;

        //        Client.Credentials = new NetworkCredential("phuongkiet850@gmail.com", "qrnqqbrjxedkblie");
        //        MailMessage Msg = new MailMessage();
        //        Msg.From = new MailAddress("phuongkiet850@gmail.com");
        //        Msg.To.Add(userModel.UserEmail);
        //        //Msg.Subject = "Mã xác nhận";
        //        Msg.IsBodyHtml = true;
        //        string html = "";
        //        if (!string.IsNullOrEmpty(password))
        //        {
        //            html = @"<!DOCTYPE html>
        //                            <html>
        //                            <meta name='viewport' content='width=device-width, initial-scale=1'>
        //                            <body>
        //                            <div class='w3-container'>
        //                              <div class='w3-card-4' style='width:70%'>
        //                                <header class='w3-container w3-light-grey'>
        //                                 <img src='https://localhost:44304//Uploads/image.png'alt='Avatar' class='w3-left w3-circle w3-margin-right' style='width:60px'> <h3>Highlands Coffee</h3>
        //                                </header>
        //                                <div class='w3-container'>
        //                                  <p>Xin chào " + userModel.UserFullName + " !</p>" +
        //                                 "<hr> <p>Đây là tin nhắn tự động mật khẩu của bạn là: " + password + " </p><br></div>" +
        //                                                       "<a href='" + url + "' class='w3-button w3-block w3-dark-grey'>Kích hoạt</a> </div></div></body>";
        //        }
        //        else if (string.IsNullOrEmpty(url))
        //        {
        //            html = @"<!DOCTYPE html>
        //                            <html>
        //                            <meta name='viewport' content='width=device-width, initial-scale=1'>
        //                            <body>
        //                            <div class='w3-container'>
        //                              <div class='w3-card-4' style='width:70%'>
        //                                <header class='w3-container w3-light-grey'>
        //                                  <img src='https://localhost:44304//Uploads/image.png' alt='Avatar' class='w3-left w3-circle w3-margin-right' style='width:60px'><h3>Highlands Coffee</h3>
        //                                </header>
        //                                <div class='w3-container'>
        //                                  <p>Xin chào !</p>""<hr> <p>Đây là tin nhắn tự động mật khẩu của bạn là: " + password + " </p><br></div></div></div></body>";
        //        }
        //        else
        //        {
        //            html = @"<!DOCTYPE html>
        //                            <html>
        //                            <meta name='viewport' content='width=device-width, initial-scale=1'>
        //                            <body>
        //                            <div class='w3-container'>
        //                              <div class='w3-card-4' style='width:70%'>
        //                                <header class='w3-container w3-light-grey'>
        //                                  <img src='https://localhost:44304//Uploads/image.png' alt='Avatar' class='w3-left w3-circle w3-margin-right' style='width:60px'><h3>Highlands Coffee</h3>
        //                                </header>
        //                                <div class='w3-container'>
        //                                  <p>Xin chào " + userModel.UserFullName + " !</p>" +
        //                                 "<hr> <a href='" + url + "' class='w3-button w3-block w3-dark-grey'>Kích hoạt</a> </div></div></body>";
        //        }
        //        Msg.Body = html;
        //        Client.Send(Msg);
        //    }
        //    catch (Exception e)
        //    {
        //        message.Messenge = "Có lỗi xảy ra khi gửi email !";
        //        message.Type = "Error";
        //        message.Description = e.Message;
        //        _message = message;
        //    }
        //}

        public static string RandomPassword()
        {
            StringBuilder builder = new StringBuilder();
            builder.Append(RandomString(1, true));
            builder.Append(RandomNumber(0, 9));
            builder.Append(RandomNumber(0, 9));
            builder.Append(RandomString(2, true));
            builder.Append(RandomNumber(0, 9));
            builder.Append(RandomString(1, true));
            return builder.ToString();
        }

        public static string RandomString(int Size, bool LowerCase)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < Size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
                Thread.Sleep(10);
            }
            if (LowerCase)
            {
                return builder.ToString().ToLower();
            }
            return builder.ToString();
        }

        public static int RandomNumber(int min, int max)
        {
            Random random = new Random();
            return random.Next(min, max);
        }

        public static long FormatDateToInt(string datetime, string type)
        {
            // Type DDMMYYYY - day month year
            // Type YYYYMMDD - year month day
            // Type DDMMYYYYHHMM - day month year hour min
            // Type YYYYMMDDHHMM - year month day hour min
            // Type YYYYMMDDHHMMSS - year month day hour min sec
            // Type DDMMYYYYHHMMSS - day month year hour min sec
            string year = "";
            string month = "";
            string day = "";
            string hour = "";
            string mi = "";
            string sec = "";
            string stringDate = datetime.ToString();
            try
            {
                if (type == "DDMMYYYY")
                {
                    //29/01/2001
                    year = stringDate.Substring(6, 4);
                    month = stringDate.Substring(3, 2);
                    day = stringDate.Substring(0, 2);
                    return int.Parse(year + month + day);
                }
                else if (type == "YYYYMMDD")
                {
                    //2001/01/29
                    year = stringDate.Substring(0, 4);
                    month = stringDate.Substring(5, 2);
                    day = stringDate.Substring(8, 2);
                    return int.Parse(year + month + day);
                }
                else if (type == "YYYYMMDDHHMM")
                {
                    ////2001/01/29 23:12
                    year = stringDate.Substring(0, 4);
                    month = stringDate.Substring(5, 2);
                    day = stringDate.Substring(8, 2);
                    hour = stringDate.Substring(11, 2);
                    mi = stringDate.Substring(14, 2);
                    return int.Parse(year + month + day + hour + mi);
                }
                else if (type == "DDMMYYYYHHMM")
                {
                    ////29/01/2001 23:12
                    year = stringDate.Substring(6, 4);
                    month = stringDate.Substring(3, 2);
                    day = stringDate.Substring(0, 2);
                    hour = stringDate.Substring(11, 2);
                    mi = stringDate.Substring(14, 2);
                    return int.Parse(year + month + day + hour + mi);
                }
                else if (type == "YYYYMMDDHHMMSS")
                {
                    ////2001/01/29 23:12:12
                    year = stringDate.Substring(0, 4);
                    month = stringDate.Substring(5, 2);
                    day = stringDate.Substring(8, 2);
                    hour = stringDate.Substring(11, 2);
                    mi = stringDate.Substring(14, 2);
                    sec = stringDate.Substring(17, 2);
                    return Int64.Parse(year + month + day + hour + mi + sec);
                }
                else
                {
                    ////29/01/2001 23:12:12
                    year = stringDate.Substring(6, 4);
                    month = stringDate.Substring(3, 2);
                    day = stringDate.Substring(0, 2);
                    hour = stringDate.Substring(11, 2);
                    mi = stringDate.Substring(14, 2);
                    sec = stringDate.Substring(17, 2);
                    return Int64.Parse(year + month + day + hour + mi + sec);
                }
            }
            catch (Exception)
            {
                return 1;
            }
        }
    }
}
