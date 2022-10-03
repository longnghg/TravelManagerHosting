using Newtonsoft.Json.Linq;
using PrUtility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Travel.Context.Models;
using Travel.Context.Models.Travel;
using Travel.Shared.ViewModels;

namespace Travel.Data.Responsives
{
    class ResAuthentication
    {
        private readonly TravelContext context;
        public ResAuthentication(TravelContext _context)
        {
            context = _context;
        }
        public Employee EmpLogin(string email)
        {
            try
            {
                //var result = context.Users.Where(x => x.IsDelete == false &&
                //                                      x.UserEmail == email).FirstOrDefault();
                //return result;
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Employee EmpLogin(string email, string password)
        {
            try
            {
                //var result = context.Users.Where(x => x.IsDelete == false &&
                //                                      x.UserPassword == password &&
                //                                      x.UserEmail == email).FirstOrDefault();

                //return result;
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }


        public bool EmpAddToken(string token, Employee emp)
        {
            try
            {
                //context.Users.Find(user.UserId).UserToken = token;
                //context.Users.Find(user.UserId).UserStatus = true;
                //context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool EmpActive(string email)
        {
            try
            {
                //var result = context.Users.Where(x => x.IsDelete == false &&
                //                                      x.Active == true &&
                //                                      x.UserEmail == email).FirstOrDefault();
                //return (result != null) ? true : false;

                return true;

            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool EmpIsNew(string email)
        {
            try
            {
                //var result = context.Users.Where(x => x.IsDelete == false &&
                //                                      x.IsNew == false &&
                //                                      x.UserEmail == email).FirstOrDefault();
                //return (result != null) ? true : false;
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool EmpDeleteToken(string Id)
        {
            try
            {
                try
                {
                    //var user = context.Users.Where(x => x.UserId == userId).FirstOrDefault();
                    //user.UserToken = null;
                    //user.UserStatus = false;
                    //context.SaveChanges();
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public string Encryption(string password)
        {
            MD5CryptoServiceProvider MD5 = new MD5CryptoServiceProvider();
            byte[] Encrypt;
            UTF8Encoding Encode = new UTF8Encoding();
            Encrypt = MD5.ComputeHash(Encode.GetBytes(password));
            StringBuilder Encryptdata = new StringBuilder();
            for (int i = 0; i < Encrypt.Length; i++)
            {
                Encryptdata.Append(Encrypt[i].ToString());
            }
            return Encryptdata.ToString();
        }
    }
}
