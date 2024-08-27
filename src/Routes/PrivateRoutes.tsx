import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/constants';
import Dashboard from '../Views/Dashboard';
// import { ProductsAdd, ProductsList } from '../Views/Products';
import AuctionDetails from '../Views/Auction/AuctionDetails/AuctionDetails';
import AuctionManagementList from '../Views/Auction/AuctionManagementList';
import { PlanDetailedView, Plans } from '../Views/BidsPlan';
import { CategoriesList } from '../Views/Categories';
import ContactUs from '../Views/PagesContentManagement/ContactUs/ContactUs';
import Faqs from '../Views/PagesContentManagement/Faqs/FaqsContent';
import HeaderContent from '../Views/PagesContentManagement/HeaderContent';
import HowItWorks from '../Views/PagesContentManagement/How-it-works/HowItWorksContent';
import TermsAndCondtion from '../Views/PagesContentManagement/TermsAndCondtion/TermsAndCondtion';
import { AuctionInvoices, PurchaseInvoices } from '../Views/Invoices';
import { ProductsList } from '../Views/Products';
import { CreateReferral, ReferralListing } from '../Views/ReferralSystem';
import { BidsHistory, PlansHistory } from '../Views/Transactions';
import ProductsHistory from '../Views/Transactions/ProductsHistory';
import ReferralHistory from '../Views/Transactions/ReferralHistory';
import Users from '../Views/Users';
import UserDetails from '../Views/Users/UserDetails';
import { CustomRouter } from './RootRoutes';
import PrivacyPolicy from '../Views/PagesContentManagement/PrivacyPolicy';
import Companies from '../Views/PagesContentManagement/Companies';
import BidPackSection from '../Views/PagesContentManagement/BidPackSection/BidPackSection';
import HeroContent from '../Views/PagesContentManagement/HeroContent';
import TopAuction from '../Views/PagesContentManagement/TopAuction';
import Footer from '../Views/PagesContentManagement/Footer';
import ReservePriceReached from '../Views/NotificationsContentManagement/ReservePriceReached/ReservePriceReached';
import NewBidPlaced from '../Views/NotificationsContentManagement/NewBidPlaced/NewBidPlaced';
import AutomaticBidRunnedOut from '../Views/NotificationsContentManagement/AutomaticBidRunnedOut/AutomaticBidRunnedOut';
import BidTimeLeft from '../Views/NotificationsContentManagement/BidTimeLeft/BidTimeLeft';
import Winners from '../Views/NotificationsContentManagement/Winners/Winners';
import AuctionEnded from '../Views/NotificationsContentManagement/AuctionEnded/AuctionEnded';

// eslint-disable-next-line import/prefer-default-export
export const PRIVATE_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.AUCTION_MANAGEMENT.path,
    element: <AuctionManagementList />,
    title: ROUTES_CONFIG.AUCTION_MANAGEMENT.title,
  },
  {
    path: ROUTES_CONFIG.AUCTION_DETAILS.path,
    element: <AuctionDetails />,
    title: ROUTES_CONFIG.AUCTION_DETAILS.title,
  },
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <Dashboard />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
  },
  {
    path: ROUTES_CONFIG.INVOICES_AUCTION.path,
    element: <AuctionInvoices />,
    title: ROUTES_CONFIG.INVOICES_AUCTION.title,
  },
  {
    path: ROUTES_CONFIG.INVOICES_PURCHASE.path,
    element: <PurchaseInvoices />,
    title: ROUTES_CONFIG.INVOICES_PURCHASE.title,
  },
  {
    path: ROUTES_CONFIG.PRODUCTS.path,
    element: <ProductsList />,
    title: ROUTES_CONFIG.PRODUCTS.title,
  },
  {
    path: ROUTES_CONFIG.CATEGORIES.path,
    element: <CategoriesList />,
    title: ROUTES_CONFIG.CATEGORIES.title,
  },
  {
    path: ROUTES_CONFIG.USERS.path,
    element: <Users />,
    title: ROUTES_CONFIG.USERS.title,
  },
  {
    path: ROUTES_CONFIG.USERS_DETAILS.path,
    element: <UserDetails />,
    title: ROUTES_CONFIG.USERS_DETAILS.title,
  },
  // Referral
  {
    path: ROUTES_CONFIG.CREATE_REFERRAL.path,
    element: <CreateReferral />,
    title: ROUTES_CONFIG.CREATE_REFERRAL.title,
  },
  {
    path: ROUTES_CONFIG.REFERRAL_LISTING.path,
    element: <ReferralListing />,
    title: ROUTES_CONFIG.REFERRAL_LISTING.title,
  },
  {
    path: `${ROUTES_CONFIG.REFERRAL_LISTING.path}/:id`,
    element: <ReferralListing />,
    title: ROUTES_CONFIG.REFERRAL_LISTING.title,
  },
  // Bids Plans
  {
    path: ROUTES_CONFIG.BIDS_PLANS.path,
    element: <Plans />,
    title: ROUTES_CONFIG.BIDS_PLANS.title,
  },
  {
    path: `${ROUTES_CONFIG.BIDS_PLANS.path}/:id`,
    element: <PlanDetailedView />,
    title: ROUTES_CONFIG.BIDS_PLANS.title,
  },
  // Transactions
  {
    path: ROUTES_CONFIG.TRANSACTIONS_PLANS_HISTORY.path,
    element: <PlansHistory />,
    title: ROUTES_CONFIG.TRANSACTIONS_PLANS_HISTORY.title,
  },
  {
    path: ROUTES_CONFIG.TRANSACTIONS_BIDS_HISTORY.path,
    element: <BidsHistory />,
    title: ROUTES_CONFIG.TRANSACTIONS_BIDS_HISTORY.title,
  },
  {
    path: ROUTES_CONFIG.TRANSACTIONS_PRODUCTS_HISTORY.path,
    element: <ProductsHistory />,
    title: ROUTES_CONFIG.TRANSACTIONS_PRODUCTS_HISTORY.title,
  },
  {
    path: ROUTES_CONFIG.TRANSACTIONS_REFERRAL_HISTORY.path,
    element: <ReferralHistory />,
    title: ROUTES_CONFIG.TRANSACTIONS_REFERRAL_HISTORY.title,
  },
  {
    path: ROUTES_CONFIG.HEADERS_CONTENT.path,
    element: <HeaderContent />,
    title: ROUTES_CONFIG.HEADERS_CONTENT.title,
  },
  {
    path: ROUTES_CONFIG.FAQS_CONTENT.path,
    element: <Faqs />,
    title: ROUTES_CONFIG.FAQS_CONTENT.title,
  },
  {
    path: ROUTES_CONFIG.HOW_IT_WORKS_CONTENT.path,
    element: <HowItWorks />,
    title: ROUTES_CONFIG.HOW_IT_WORKS_CONTENT.title,
  },
  {
    path: ROUTES_CONFIG.CONTACTUS_CONTENT.path,
    element: <ContactUs />,
    title: ROUTES_CONFIG.CONTACTUS_CONTENT.title,
  },
  {
    path: ROUTES_CONFIG.TERMS_AND_CONDITION_CONTENT.path,
    element: <TermsAndCondtion />,
    title: ROUTES_CONFIG.TERMS_AND_CONDITION_CONTENT.title,
  },
  {
    path: ROUTES_CONFIG.PRIVACY_POLICY_CONTENT.path,
    element: <PrivacyPolicy />,
    title: ROUTES_CONFIG.PRIVACY_POLICY_CONTENT.title,
  },
  {
    path: ROUTES_CONFIG.COMPANIES_CONTENT.path,
    element: <Companies />,
    title: ROUTES_CONFIG.COMPANIES_CONTENT.title,
  },
  {
    path: ROUTES_CONFIG.BID_PACK_SECTION.path,
    element: <BidPackSection />,
    title: ROUTES_CONFIG.BID_PACK_SECTION.title,
  },
  {
    path: ROUTES_CONFIG.HERO_SECTION.path,
    element: <HeroContent />,
    title: ROUTES_CONFIG.HERO_SECTION.title,
  },
  {
    path: ROUTES_CONFIG.TOP_AUCTION_SECTION.path,
    element: <TopAuction />,
    title: ROUTES_CONFIG.TOP_AUCTION_SECTION.title,
  },
  {
    path: ROUTES_CONFIG.FOOTER.path,
    element: <Footer />,
    title: ROUTES_CONFIG.FOOTER.title,
  },
  {
    path: ROUTES_CONFIG.RESERVE_PRICE_REACHED.path,
    element: <ReservePriceReached />,
    title: ROUTES_CONFIG.RESERVE_PRICE_REACHED.title,
  },
  {
    path: ROUTES_CONFIG.NEW_BID_PLACED.path,
    element: <NewBidPlaced />,
    title: ROUTES_CONFIG.NEW_BID_PLACED.title,
  },
  {
    path: ROUTES_CONFIG.AUTOMATIC_BID_RUNNED_OUT.path,
    element: <AutomaticBidRunnedOut />,
    title: ROUTES_CONFIG.AUTOMATIC_BID_RUNNED_OUT.title,
  },
  {
    path: ROUTES_CONFIG.BID_TIME_LEFT.path,
    element: <BidTimeLeft />,
    title: ROUTES_CONFIG.BID_TIME_LEFT.title,
  },
  {
    path: ROUTES_CONFIG.WINNER.path,
    element: <Winners />,
    title: ROUTES_CONFIG.WINNER.title,
  },
  {
    path: ROUTES_CONFIG.AUCTION_ENDED.path,
    element: <AuctionEnded />,
    title: ROUTES_CONFIG.AUCTION_ENDED.title,
  },
  // Wildcard
  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PRIVATE} />,
    title: 'Rendering wildcard',
  },
];
