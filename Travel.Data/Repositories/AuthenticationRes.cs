using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Travel.Context.Models;
using Travel.Context.Models.Travel;
using Travel.Data.Interfaces;

namespace Travel.Data.Responsives
{
    public class AuthenticationRes : IAuthentication
    {
        private readonly TravelContext _db;
        public AuthenticationRes(TravelContext db)
        {
            _db = db;
        }
        public Employee EmpLogin(string email)
        {
            try
            {
                //var result = _db.Employees.Where(x => x.IsDelete == false &&
                //                                      x.Email == email).FirstOrDefault();
                var result = (from x in _db.Employees where x.IsDelete == false && 
                                                            x.Email == email select x).FirstOrDefault();
                return result;
 
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
                //var result = _db.Employees.Where(x => x.IsDelete == false &&
                //                                      x.Password  == password &&
                //                                      x.Email == email).FirstOrDefault();
                var result = (from x in _db.Employees
                              where x.IsDelete == false &&
                                    x.Email == email &&
                                    x.Password == password
                              select x).FirstOrDefault();

                return result;
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
                _db.Employees.Find(emp.IdEmployee).AccessToken = token;
                _db.SaveChanges();
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
                //var result = _db.Employees.Where(x => x.IsDelete == false &&
                //                                      x.IsActive == true &&
                //                                      x.Email == email).FirstOrDefault();
                var result = (from x in _db.Employees
                              where x.IsDelete == false &&
                                    x.IsActive == true &&
                                    x.Email == email
                              select x).FirstOrDefault();
                return (result != null) ? true : false;


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
                //var result = _db.Users.Where(x => x.IsDelete == false &&
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
                    //var user = _db.Users.Where(x => x.UserId == userId).FirstOrDefault();
                    //user.UserToken = null;
                    //user.UserStatus = false;
                    //_db.SaveChanges();
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
