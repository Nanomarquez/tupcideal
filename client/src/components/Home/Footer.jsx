import React from "react";
import Logo from '../../assets/logo.png'
function Footer() {
  return (
    <footer class="p-4 bg-gray-900 rounded-t-3xl shadow md:px-6 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="flex items-center mb-4 sm:mb-0">
          <img
            src={Logo}
            class="mr-3 h-8"
            alt="Flowbite Logo"
          />
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Tu PC Ideal
          </span>
        </div>
        <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6 ">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022{" "}
          Flowbite™
        . All Rights Reserved.
      </span>
    </footer>
  );
}

export default Footer;
