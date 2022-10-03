using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class Customer
    {
        private Guid id;
        private string name;
        private string phone;
        private string email;
        private string address;
        private string password;
        private long  birthday;
        private long createDate;
        private string accessToken;
        private int point;
        private string fbToken;
        private string googleToken;

        public Guid Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Phone { get => phone; set => phone = value; }
        public string Email { get => email; set => email = value; }
        public string Address { get => address; set => address = value; }
        public string Password { get => password; set => password = value; }
        public long Birthday { get => birthday; set => birthday = value; }
        public long CreateDate { get => createDate; set => createDate = value; }
        public string AccessToken { get => accessToken; set => accessToken = value; }
        public int Point { get => point; set => point = value; }
        public string FbToken { get => fbToken; set => fbToken = value; }
        public string GoogleToken { get => googleToken; set => googleToken = value; }
    }
}
