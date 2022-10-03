using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Travel.Shared.Ultilities
{
    public static class Ultility
    {

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

    }
}
