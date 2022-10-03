using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Context.Models;

namespace Travel.Data.Interfaces
{
    public interface IAuthentication
    {
        Employee EmpLogin(string email);
        Employee EmpLogin(string email, string password);
        bool EmpAddToken(string token, Employee emp);
        bool EmpActive(string email);
        bool EmpIsNew(string email);
        bool EmpDeleteToken(string Id);
        string Encryption(string password);
    }
}
